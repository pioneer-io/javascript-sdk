class FakeContext {
  constructor({userKey}) {
    this.userKey = userKey;
  }

  getKey() {
    return this.userKey;
  }
}

module.exports = FakeContext;