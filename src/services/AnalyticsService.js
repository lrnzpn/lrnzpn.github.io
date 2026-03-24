export class AnalyticsService {
  constructor() {
    this.events = [];
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
  }

  generateSessionId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  trackPageView(path, title) {
    this.track('page_view', {
      path,
      title,
      referrer: document.referrer,
      timestamp: Date.now(),
    });
  }

  trackEvent(category, action, label = null, value = null) {
    this.track('event', {
      category,
      action,
      label,
      value,
      timestamp: Date.now(),
    });
  }

  trackPerformance(metrics) {
    this.track('performance', {
      ...metrics,
      timestamp: Date.now(),
    });
  }

  track(type, data) {
    const event = {
      type,
      sessionId: this.sessionId,
      ...data,
    };

    this.events.push(event);

    if (this.events.length >= 10) {
      this.flush();
    }
  }

  flush() {
    if (this.events.length === 0) return;

    console.log('Analytics events:', this.events);

    this.events = [];
  }

  getSessionDuration() {
    return Date.now() - this.startTime;
  }
}

export const analytics = new AnalyticsService();
