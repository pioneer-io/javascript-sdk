const FakeStrategy = require('./fakeStrategy');

class FakeFeatureState {
  constructor({title, value, strategy}) {
    this.title = title;
    this.value = value;
    this.strategy = new FakeStrategy(strategy);
  }

}

module.exports = FakeFeatureState;