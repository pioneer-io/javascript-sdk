const Strategy = require('./strategy');

class FeatureState {
  constructor({key, value, strategy}) {
    this.key = key;
    this.value = value;
    if (strategy) {
      this.strategy = new Strategy(strategy);
    }
  }

}

module.exports = FeatureState;