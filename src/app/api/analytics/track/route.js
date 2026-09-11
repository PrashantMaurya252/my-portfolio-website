import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Visitor, Session, Event } from '@/models/Analytics';

export async function POST(req) {
  try {
    await connectToDatabase();
    
    const body = await req.json();
    const { visitorId, sessionId, events, visitorInfo, sessionInfo } = body;

    if (!visitorId || !sessionId) {
      return NextResponse.json({ error: 'Missing visitorId or sessionId' }, { status: 400 });
    }

    // Upsert Visitor
    await Visitor.findOneAndUpdate(
      { visitorId },
      { 
        $set: {
          browser: visitorInfo?.browser,
          device: visitorInfo?.device,
          os: visitorInfo?.os,
          lastVisit: new Date(),
        },
        $setOnInsert: { firstVisit: new Date() }
      },
      { upsert: true, new: true }
    );

    // Upsert Session
    if (sessionInfo) {
      await Session.findOneAndUpdate(
        { sessionId },
        {
          $set: {
            visitorId,
            endTime: new Date(),
          },
          $setOnInsert: {
            startTime: new Date(),
            referrer: sessionInfo.referrer
          }
        },
        { upsert: true, new: true }
      );
    } else {
       // Just update session end time for heartbeat
       await Session.updateOne({ sessionId }, { endTime: new Date() });
    }

    // Insert Events
    if (events && events.length > 0) {
      const formattedEvents = events.map(e => ({
        sessionId,
        visitorId,
        eventType: e.type,
        payload: e.payload,
        timestamp: e.timestamp || new Date()
      }));
      await Event.insertMany(formattedEvents);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics Track Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Handle CORS if needed from other origins (though this is typically same-origin)
export async function OPTIONS(request) {
  const origin = request.headers.get('origin');
  return new NextResponse(null, {
      status: 204,
      headers: {
          'Access-Control-Allow-Origin': origin || '*',
          'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
      },
  });
}
