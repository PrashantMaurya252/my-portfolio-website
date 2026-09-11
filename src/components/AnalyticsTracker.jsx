'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { UAParser } from 'ua-parser-js';

// Helper to track clicks manually from other components
export const trackClick = (name, url = '') => {
  if (typeof window === 'undefined') return;
  const sessionId = sessionStorage.getItem('analytics_session_id');
  const visitorId = localStorage.getItem('analytics_visitor_id');
  if (!sessionId || !visitorId) return;

  fetch('/api/analytics/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      visitorId,
      sessionId,
      events: [{ type: 'click', payload: { name, url }, timestamp: new Date() }]
    }),
  }).catch(err => console.error('Error tracking click:', err));
};

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const heartbeatIntervalRef = useRef(null);
  const currentSectionRef = useRef('overview');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Initialize Visitor
    let visitorId = localStorage.getItem('analytics_visitor_id');
    let isNewVisitor = false;
    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem('analytics_visitor_id', visitorId);
      isNewVisitor = true;
    }

    const parser = new UAParser();
    const result = parser.getResult();
    const visitorInfo = {
      browser: { name: result.browser.name, version: result.browser.version },
      device: { 
        vendor: result.device.vendor || 'Unknown', 
        model: result.device.model || 'Unknown', 
        type: result.device.type || 'desktop' 
      },
      os: { name: result.os.name, version: result.os.version }
    };

    // 2. Initialize Session
    let sessionId = sessionStorage.getItem('analytics_session_id');
    let sessionInfo = null;
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem('analytics_session_id', sessionId);
      sessionInfo = {
        referrer: document.referrer || 'direct'
      };
    }

    // Function to flush events
    const track = async (events) => {
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            visitorId,
            sessionId,
            visitorInfo,
            sessionInfo,
            events,
          }),
        });
      } catch (err) {
        console.error('Analytics tracking failed', err);
      }
    };

    // Track Page View
    track([{ type: 'page_view', payload: { path: pathname }, timestamp: new Date() }]);

    // Setup Intersection Observer for section tracking
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section that is most visible
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            currentSectionRef.current = entry.target.id || 'overview';
          }
        });
      },
      { threshold: 0.2 } // Reduced threshold to catch larger sections
    );

    // Use a small delay to ensure DOM is fully rendered
    setTimeout(() => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => observer.observe(section));
    }, 500);

    // Heartbeat every 15 seconds to track time spent
    heartbeatIntervalRef.current = setInterval(() => {
      track([{ 
        type: 'heartbeat', 
        payload: { path: pathname, section: currentSectionRef.current }, 
        timestamp: new Date() 
      }]);
    }, 15000);

    return () => {
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
      }
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
