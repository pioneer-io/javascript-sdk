const ClientWithContext = require('../clientWithContext');
const FakeContext = require('./fakeContext');

class FakeConfig {
  constructor(serverAddress, sdkKey) {
    this.serverAddress = serverAddress;
    this.sdkKey = sdkKey;
  }

  connect() {
    const client = new client(this);
    this.client = client;
    client.start();
    return this;
  }

  withContext() {
    const self = this;
    return new ClientWithContext({
      context: new FakeContext({

        userKey: "user123"
      }),
      client: self.client,
      config: self
    });
  }

  getServerAddress() {
    return `${this.serverAddress}/features`;
  }
}

module.exports = FakeConfig