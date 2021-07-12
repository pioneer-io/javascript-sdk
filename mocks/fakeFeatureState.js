const FakeStrategy = require('./fakeStrategy');

class FakeFeatureState {
  constructor({key, value, strategy}) {
    this.key = key;
    this.value = value;
    this.strategy = new FakeStrategy(strategy);
  }

}

module.exports = FakeFeatureState;