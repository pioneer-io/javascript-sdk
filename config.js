const EventSourceClient = require('./eventSourceClient');
const ClientWithContext = require('./clientWithContext');
const wait = require('./lib/wait');

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

  async withWaitForData(options = {timeOut: 100, pollingAttempts: 100}) {
    const { timeOut, pollingAttempts } = options;
    let attempts = 0;
    while (this.client.hasData === false) {
      attempts++
      if (attempts > pollingAttempts) {
        // throw new Error("Waiting for data reached the max number of attempts");
        console.log("time out");
        break;
      }
      await wait(timeOut);
    }
    return this;
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