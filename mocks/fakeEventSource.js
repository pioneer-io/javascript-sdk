class FakeEventSource {
  constructor(serverAddress, options) {
    this.serverAddress = serverAddress;
    this.options = options;

    return this;
  }


  fakeEmitMessage() {
    const event = {
      data: JSON.stringify({
        eventType: "ALL_FEATURES",
        payload: JSON.stringify([
          {
            title: "LOGIN_MICROSERVICE",
            is_active: false,
            strategy: {
              percentage: 0.5,
              value: true
            }
          }
        ])
      }
    )
  };
  this.onmessage(event);
  }

  close() {
    console.log("Closing fake event source");
    return;
  }
}

module.exports = FakeEventSource