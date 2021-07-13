const EventSourceClient = require('./eventSourceClient');
const ClientWithContext = require('./clientWithContext');

class Config {
  constructor(serverAddress, sdkKey) {
    this.serverAddress = serverAddress;
    this.sdkKey = sdkKey;
  }

  connect() {
    const client = new EventSourceClient(this);
    this.client = client;
    client.start();
    return this; // the go sdk returns the config rather than the event source client
  }

  withContext() {
    // make sure we are staying in this context
    const self = this;
    return new ClientWithContext({
      context: new Context({

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

module.exports = Config