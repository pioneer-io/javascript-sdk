(async () => {
  const SDK = require("./config");
  try {
    const config = await new SDK("http://localhost:3030", "JazzyElksRule").connect().withWaitForData({timeOut: 1000, pollingAttempts: 5});
    const client = config.client;
    console.log(config);
    console.log(client.getFeature("LOGIN_MICROSERVICE"));
    client.apiClient.close();
  } catch(err) {
    console.log(err);
  }
})();5