class FakeClientWithContext {
  constructor({context, client, config}) {
    this.context = context;
    this.client = client;
    this.config = config;
  }

  getFeature(key) {
    // get the full feature
    const featureState = this.client.getFeature(key);

    // evaluate the strategy and return the updated feature (based on the strategy and context)
    const calculatedFeature = featureState.strategy.calculate(this.context);

    if (calculatedFeature) {
      return calculatedFeature;
    } else {
      return featureState.value;
    };
  }
}

module.exports = FakeClientWithContext;