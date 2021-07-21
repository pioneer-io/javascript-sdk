const EventSource = require("eventsource");
const eventTypes = require('./lib/eventTypes');
const FeatureState = require('./featureState');
const AnalyticsCollector = require('./analyticsCollector');
const handleUndefinedFeature = require('./lib/handleUndefinedFeature');

class EventSourceClient {
  constructor(config) {
    // todo: typechecks

    this.config = config;
    this.features = {};

    this.hasData = false;
    this.analyticsCollectors = [];
    
    const options = {
      headers: { Authorization: config.sdkKey}
    }

    // initialize the SSE with edge
    const apiClient = new EventSource(config.getServerAddress(), options);
    this.apiClient = apiClient;
  }

  start() {
    // start listening for SSE messages
    this.handleEvents();
    this.handleErrors();
  }

  handleEvents() {
    this.apiClient.onmessage = (event) => {
      // JSON parse the entire SSE message (in the data property)
      const data = JSON.parse(event.data);

      // get the eventType
      const eventType = data.eventType;
      
      // get the payload
      const payload = data.payload;

      // call the proper handler function based on the eventType
      switch (eventType) {

        case eventTypes.UPDATE_FEATURE:
          this.handleUpdateFeature(payload);
          return
          
        case eventTypes.ALL_FEATURES:
          this.handleAllFeatures(payload);
          return

        case eventTypes.CREATE_CONNECTION:
          return
      }
    }
  }

  handleErrors() {
    this.apiClient.onerror = (error) => {
      console.log("Event source failed: ", error);
    }
  }

  handleUpdateFeature(payload) {
    const { key } = payload;

    // create a new feature state and override the previous value
    this.features[key] = new FeatureState(payload);
  }

  handleAllFeatures(allFeatures) {
    allFeatures = JSON.parse(allFeatures);
    // initialize a new object of feature states and override the previous value
    const featureStates = {};

    allFeatures.forEach((featureStateParams) => {
      const { title, is_active, rollout } = featureStateParams;
      const modifiedFeatureStateParams = {
        value: is_active,
        title,
        strategy: {
          percentage: rollout
        }
      }
      featureStates[title] = new FeatureState(modifiedFeatureStateParams);
    })
    this.features = featureStates;

    this.hasData = true;
  }

  getFeature(key, defaultValue) {
    const featureState = this.getFeatureState(key);
    if (!featureState) {
      return handleUndefinedFeature(key, defaultValue);
    }
    const value = featureState.value;
    return value;
  }

  getFeatureState(key) {
    return this.features[key];
  }

  addGoogleAnalyticsCollector({ trackingId, clientId, strictCidFormat }) {
    const analyticsCollector = new AnalyticsCollector({ trackingId, clientId, strictCidFormat });
    this.analyticsCollectors.push(analyticsCollector);
    return analyticsCollector;
  }


  logEvent({ category, action, label, value }) {
    this.analyticsCollectors.forEach((analyticsCollector) => {
      analyticsCollector.logEvent({
        category,
        action,
        label,
        value
      });
    })
  }
}

module.exports = EventSourceClient