import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Visitor, Session, Event } from '@/models/Analytics';

function setCorsHeaders(res) {
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return res;
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  return setCorsHeaders(response);
}

export async function GET(req) {
  try {
    await connectToDatabase();

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // 1. Total Visitors
    const totalVisitors = await Visitor.countDocuments();

    // 2. Total Sessions
    const totalSessions = await Session.countDocuments();

    // 3. Today's Clicks (resume, linkedin, etc)
    // Find all 'click' events today
    const todaysClicks = await Event.aggregate([
      { 
        $match: { 
          eventType: 'click', 
          timestamp: { $gte: today } 
        } 
      },
      { 
        $group: { 
          _id: '$payload.name', 
          count: { $sum: 1 } 
        } 
      },
      { $sort: { count: -1 } }
    ]);

    // Format today's clicks as a nice object/array
    const formattedTodaysClicks = todaysClicks.map(c => ({
      name: c._id || 'Unknown',
      count: c.count
    }));

    // 4. Overall Clicks
    const overallClicks = await Event.aggregate([
      { $match: { eventType: 'click' } },
      { $group: { _id: '$payload.name', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // 5. Page Views (Overall)
    const pageViews = await Event.aggregate([
      { $match: { eventType: 'page_view' } },
      { $group: { _id: '$payload.path', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // 6. Average Time Spent per Session (calculate from start and end time of sessions)
    const sessionsForTime = await Session.aggregate([
      {
        $project: {
          durationMs: { $subtract: ['$endTime', '$startTime'] }
        }
      },
      {
        $group: {
          _id: null,
          avgDurationMs: { $avg: '$durationMs' }
        }
      }
    ]);
    const avgSessionDurationSeconds = sessionsForTime.length > 0 ? (sessionsForTime[0].avgDurationMs / 1000).toFixed(0) : 0;

    // 7. Device Breakdown
    const devices = await Visitor.aggregate([
      { $group: { _id: '$device.type', count: { $sum: 1 } } }
    ]);

    // 8. Section Engagement
    const sectionHeartbeats = await Event.aggregate([
      { $match: { eventType: 'heartbeat', 'payload.section': { $exists: true } } },
      { $group: { _id: '$payload.section', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Each heartbeat is 15 seconds
    const sectionEngagement = sectionHeartbeats.map(s => ({
      section: s._id,
      timeSpentSeconds: s.count * 15
    }));

    // Return the combined overview
    const response = NextResponse.json({
      overview: {
        totalVisitors,
        totalSessions,
        avgSessionDurationSeconds: parseInt(avgSessionDurationSeconds),
      },
      todaysClicks: formattedTodaysClicks,
      overallClicks: overallClicks.map(c => ({ name: c._id || 'Unknown', count: c.count })),
      topPages: pageViews.map(p => ({ path: p._id, count: p.count })),
      deviceBreakdown: devices.map(d => ({ device: d._id || 'desktop', count: d.count })),
      sectionEngagement
    });

    return setCorsHeaders(response);
  } catch (error) {
    console.error('Analytics Overview Error:', error);
    const response = NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    return setCorsHeaders(response);
  }
}
