const FakeEventSource = require("./fakeEventSource");
const eventTypes = require('../lib/eventTypes');
const FakeFeatureState = require('./fakeFeatureState');

class FakeEventSourceClient {
  constructor(config) {
    this.config = config;
    this.features = {};

    const options = {
      headers: { Authorization: config.sdkKey}
    }

    const apiClient = new FakeEventSource(config.getServerAddress(), options);
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

        case eventTypes.ALL_FEATURES:
          this.handleAllFeatures(payload);
      }
    }
  }

  handleErrors() {
    this.apiClient.onerror = (error) => {
      console.log("Event source failed: ", error);
    }
  }

  handleAllFeatures(payload) {
    // initialize a new object of feature states and override the previous value
    const featureStates = {};

    allFeatures.forEach((featureStateParams) => {
      const { title, is_active } = featureStateParams;
      const modifiedFeatureStateParams = {
        value: is_active,
        title
      }
      featureStates[title] = new FakeFeatureState(modifiedFeatureStateParams);
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
}

module.exports = FakeEventSourceClient