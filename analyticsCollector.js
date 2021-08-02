const ua = require("universal-analytics");

class AnalyticsCollector {
  constructor({ trackingId, clientId, strictCidFormat }) {
    this.visitor = ua(trackingId, clientId, { strictCidFormat });
    this.trackingId = trackingId;
    this.clientId = clientId;
  }

  logEvent({ category, action, label, value }) {
    this.visitor.event(category, action, label, value, (err) => {
      if (err) {
        console.log("Error logging google analytics event", err);
      }
    });
  }
}

module.exports = AnalyticsCollector