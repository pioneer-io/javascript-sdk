const fetch = require("node-fetch");
const axios = require("axios");

const ua = require("universal-analytics");

class AnalyticsCollector {
  constructor({ trackingId, clientId = '555' }) {
    this.visitor = ua(trackingId);
    this.trackingId = trackingId;
    this.clientId = clientId;
  }

  logEvent({ category, action, label, value }) {
    this.visitor.event(category, action, label, value, (err) => {
      console.log("Error loggin google analytics event", err);
    });
  }
}

module.exports = AnalyticsCollector