const Strategy = require('../strategy');

class FakeFeatureState {
  constructor({title, value, strategy}) {
    this.title = title;
    this.value = value;
    this.strategy = new Strategy(strategy);
  }

}

module.exports = FakeFeatureState;