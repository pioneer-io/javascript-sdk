const EventSourceClient = require('./eventSourceClient');
const ClientWithContext = require('./clientWithContext');
const Context = require('./context');

const wait = require('./lib/wait');

class Config {
  constructor(serverAddress, sdkKey) {
    this.serverAddress = serverAddress;
    this.sdkKey = sdkKey;
    this.client = undefined;
  }

  connect() {
    const client = new EventSourceClient(this);
    this.client = client;
    client.start();
    return this; // the go sdk returns the config rather than the event source client
  }

  async withWaitForData() {
    let attempts = 0;
    while (this.client.hasData === false) {
      attempts++
      if (attempts > 10) {
        // close
        console.log("Waiting for data reached the max number of attempts, time out");
        console.log("Closing event source...");
        this.client.close();
        console.log("Event source closed");
        break;
      }
      await wait(1000);
    }
    return this;
  }

  withContext({userKey}) {
    // make sure we are staying in this context
    const self = this;
    return new ClientWithContext({
      context: new Context({
        userKey
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