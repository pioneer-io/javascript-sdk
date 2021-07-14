(async () => {
  const SDK = require("./config");
  const config = await new SDK("http://localhost:3030", "JazzyElksRule").connect().withWaitForData();
  const client = config.client;
  console.log(config);
  console.log(client.getFeature("LOGIN_MICROSERVICE"));
  client.apiClient.close();
})();