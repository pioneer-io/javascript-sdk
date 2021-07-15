const Strategy = require('./strategy');

class FeatureState {
  constructor({title, value, strategy}) {
    this.title = title;
    this.value = value;
    if (strategy) {
      this.strategy = new Strategy(strategy);
    }
  }

}

module.exports = FeatureState;