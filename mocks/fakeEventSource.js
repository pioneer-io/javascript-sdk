class FakeEventSource {
  constructor(serverAddress, options) {
    // todo: typechecks

    this.serverAddress = serverAddress;
    this.options = options;
    
    return this;
  }


  fakeEmitMessage() {
    const event = {
      data: JSON.stringify({
        eventType: "ALL_FEATURES",
        payload: [
          {
            key: "show button",
            value: false,
            strategy: {
              percentage: 0.5,
              value: true
            }
          }
        ]
      }
    )
  };
  this.onmessage(event);
  }
}

module.exports = FakeEventSource