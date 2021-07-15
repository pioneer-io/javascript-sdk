const Config = require('../config');
const ClientWithContext = require('../clientWithContext');
const Context = require('../context');
const EventSourceClient = require('../eventSourceClient');
const FakeStrategy = require('../mocks/fakeStrategy');

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
    // expect(await newConfig.withWaitForData({timeOut: 100, pollingAttempts: 1})).toThrow();
    newConfig.client.apiClient.close();
  });

  xtest("withWaitForData will wait until it times out", async () => {
    let newConfig = new Config(serverAddress, sdkKey).connect();
    const timeOut = 10;
    const pollingAttempts = 5;
    
    const start = Date.now();
    await newConfig.withWaitForData({ timeOut, pollingAttempts });
    const end = Date.now();

    expect(end - start).toBeGreaterThanOrEqual(timeOut * pollingAttempts);
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
  
  

  // beforeEach(() => {
  //   fakeConfig = new FakeConfig(serverAddress, sdkKey);
  // });

  // test("initialize a connection", () => {
  //   const client = fakeConfig.connect();
  //   const eventSourceClient = client.eventSourceClient;
  //   expect(eventSourceClient.apiClient.serverAddress).toEqual(`${serverAddress}/features`);
  // });

  // test("emit a fake event", () => {
  //   const client = fakeConfig.connect();
  //   const eventSourceClient = client.eventSourceClient;
  //   eventSourceClient.apiClient.fakeEmitMessage();
  //   expect(eventSourceClient.features).toHaveProperty('show button');
  //   expect(eventSourceClient.features).toHaveProperty('show button.key', 'show button');
  // });

  // test("client with context", () => {
  //   fakeConfig.connect();
  //   const clientWithContext = fakeConfig.withContext();
  //   expect(clientWithContext.context).toHaveProperty('userKey');

  //   // retrieve the feature
  //   clientWithContext.eventSourceClient.apiClient.fakeEmitMessage();

  //   // current key is 'user123'
  //   expect((FakeStrategy.basicHash(clientWithContext.context.getKey()) % 100) / 100).toBeGreaterThan(0.5);
  //   expect(clientWithContext.getFeature('show button')).toBe(false);

  //   // set the key to a string that passes the percent requirement
  //   clientWithContext.context.userKey = 'cde';
  //   expect((FakeStrategy.basicHash(clientWithContext.context.getKey()) % 100) / 100).toBeLessThanOrEqual(0.5);
  //   expect(clientWithContext.getFeature('show button')).toBe(true);
  // });
});

