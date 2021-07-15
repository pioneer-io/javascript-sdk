const handleUndefinedFeature = require('./lib/hanldeUndefinedFeature');

class ClientWithContext {
  constructor({context, client, config}) {
    this.context = context;
    this.client = client;
    this.config = config;
  }

  getFeature(key, defaultValue) {
    // get the full feature
    const featureState = this.client.getFeatureState(key);
    if (!featureState) {
      return handleUndefinedFeature(key, defaultValue);
    }

    // evaluate the strategy and return the updated feature (based on the strategy and context)
    const calculatedFeature = featureState.strategy.calculate(this.context);

    if (calculatedFeature) {
      return calculatedFeature;
    } else {
      return featureState.value;
    };
  }
}

module.exports = ClientWithContext;