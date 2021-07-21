const handleUndefinedFeature = require('./lib/handleUndefinedFeature');

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
    return featureState.strategy.calculate(this.context) // either true/false;
  }

  addGoogleAnalyticsCollector(params) {
    return this.config.addGoogleAnalyticsCollector(params);
  }

  logEvent(params) {
    this.config.logEvent(params);
  }
}

module.exports = ClientWithContext;