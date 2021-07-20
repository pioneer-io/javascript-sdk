(async () => {
  const SDK = require("./config");
  try {
    const config = await new SDK("http://localhost:3030", "01ff74d1-8fbb-45f2-a118-6f8115c6e310").connect().withWaitForData({timeOut: 1000, pollingAttempts: 5});
    const client = config.client;
    config.addGoogleAnalyticsCollector({
      trackingId: 'UA-201694275-1',
      clientId: '12345'
    });
    config.logEvent({
      category: "test",
      action: "print",
      label: "login",
      value: 1
    });
    console.log(config);
    console.log(client.getFeature("LOGIN_MICROSERVICE"));
    client.apiClient.close();
  } catch(err) {
    console.log(err);
  }
})();