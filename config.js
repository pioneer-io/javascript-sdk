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

  async withWaitForData(options = {timeOut: 1000, pollingAttempts: 10}) {
    const { timeOut, pollingAttempts } = options;
    let attempts = 0;
    while (this.client.hasData === false) {
      attempts++
      if (attempts > pollingAttempts) {
        // throw new Error("Waiting for data reached the max number of attempts");
        console.log("Waiting for data reached the max number of attempts, time out");
        break;
      }
      const randomJitter = (timeOut * Math.random());
      await wait(timeOut + randomJitter);
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