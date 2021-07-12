const FakeEventSourceClient = require('./fakeEventSourceClient');
const FakeClientWithContext = require('./fakeClientWithContext');
const FakeContext = require('./fakeContext');

class FakeConfig {
  constructor(serverAddress, sdkKey) {
    this.serverAddress = serverAddress;
    this.sdkKey = sdkKey;
  }

  connect() {
    const eventSourceClient = new FakeEventSourceClient(this);
    this.eventSourceClient = eventSourceClient;
    eventSourceClient.start();
    return this;
  }

  withContext() {
    const self = this;
    return new FakeClientWithContext({
      context: new FakeContext({

        userKey: "user123"
      }),
      eventSourceClient: self.eventSourceClient,
      config: self
    });
  }

  getServerAddress() {
    return `${this.serverAddress}/features`;
  }
}

module.exports = FakeConfig