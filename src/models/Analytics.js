import mongoose from 'mongoose';

const VisitorSchema = new mongoose.Schema({
  visitorId: { type: String, required: true, unique: true },
  browser: { name: String, version: String },
  device: { vendor: String, model: String, type: String },
  os: { name: String, version: String },
  firstVisit: { type: Date, default: Date.now },
  lastVisit: { type: Date, default: Date.now },
});

const SessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  visitorId: { type: String, required: true },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date, default: Date.now },
  referrer: { type: String },
});

const EventSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  visitorId: { type: String, required: true },
  eventType: { type: String, required: true, enum: ['page_view', 'section_view', 'click', 'heartbeat'] },
  payload: { type: mongoose.Schema.Types.Mixed },
  timestamp: { type: Date, default: Date.now },
});

// Avoid OverwriteModelError in Next.js development
export const Visitor = mongoose.models.Visitor || mongoose.model('Visitor', VisitorSchema);
export const Session = mongoose.models.Session || mongoose.model('Session', SessionSchema);
export const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);
