(async () => {
  const SDK = require("./config");
  try {
    const config = await new SDK("http://localhost:3030", "01ff74d1-8fbb-45f2-a118-6f8115c6e310").connect().withWaitForData({timeOut: 1000, pollingAttempts: 5});
    // const client = config.client;
    const context = config.withContext({ userKey: "abc" });
    context.addGoogleAnalyticsCollector({
      trackingId: 'UA-201694275-1',
      clientId: '12345',
      strictCidFormat: false
    });
    console.log(context.client.analyticsCollectors);
    context.logEvent({
      category: "test",
      action: "print",
      label: "login",
      value: 1
    });
    console.log(config);
    console.log(context.client.getFeature("LOGIN_MICROSERVICE"));
    context.client.apiClient.close();
  } catch(err) {
    console.log(err);
  }
})();