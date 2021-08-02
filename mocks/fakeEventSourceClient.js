const FakeEventSource = require("./fakeEventSource");
const FeatureState = require('../featureState');
const EventSourceClient = require('../eventSourceClient');

class FakeEventSourceClient extends EventSourceClient {
  constructor(config) {
    super(config)
    this.apiClient.close();

    const options = {
      headers: { Authorization: config.sdkKey}
    }

    const apiClient = new FakeEventSource(config.getServerAddress(), options);
    this.apiClient = apiClient;
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
      featureStates[title] = new FeatureState(modifiedFeatureStateParams);
    })
    this.features = featureStates;

    this.hasData = true;
  }
}

module.exports = FakeEventSourceClient