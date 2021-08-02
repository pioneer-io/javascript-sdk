const Config = require('../config');
const ClientWithContext = require('../clientWithContext');
const Context = require('../context');
const EventSourceClient = require('../eventSourceClient');

describe('testing config', () => {
  const serverAddress = "http://localhost:3030";
  const sdkKey = "JazzyElksRule";

  xtest("create a new config", () => {
    let newConfig = new Config(serverAddress, sdkKey);
    expect(newConfig.serverAddress).toEqual(serverAddress);
    expect(newConfig.getServerAddress()).toEqual(`${serverAddress}/features`);
    expect(newConfig.sdkKey).toEqual(sdkKey);
  });

  xtest("connect the config", async () => {
    let newConfig = new Config(serverAddress, sdkKey);
    newConfig = newConfig.connect();
    expect(newConfig.client.apiClient.connectionInProgress).toEqual(false);
    expect(newConfig.client.config).toEqual(newConfig);
    expect(newConfig.client.features).toMatchObject({});

    newConfig.client.apiClient.close();
  });

  xtest("withWaitForData will wait until it times out", async () => {
    let newConfig = new Config(serverAddress, sdkKey).connect();

    const start = Date.now();
    await newConfig.withWaitForData();
    const end = Date.now();

    newConfig.client.apiClient.close();
  });

  xtest("calling with context will load the context", () => {
    let newConfig = new Config(serverAddress, sdkKey).connect();
    let userKey = "user123";
    let context = newConfig.withContext({userKey});
    expect(context).toBeInstanceOf(ClientWithContext);
    expect(context.context).toBeInstanceOf(Context);
    expect(context.client).toBeInstanceOf(EventSourceClient);
    expect(context.config).toBeInstanceOf(Config);
    newConfig.client.apiClient.close();
  });
});
