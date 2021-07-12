const FakeConfig = require('./mocks/fakeConfig');
const FakeStrategy = require('./mocks/fakeStrategy');

describe('testing config', () => {
  let fakeConfig;
  const serverAddress = "http://localhost:3030";
  const sdkKey = "JazzyElksRule";

  beforeEach(() => {
    fakeConfig = new FakeConfig(serverAddress, sdkKey);
  });

  test("initialize a connection", () => {
    const client = fakeConfig.connect();
    const eventSourceClient = client.eventSourceClient;
    expect(eventSourceClient.apiClient.serverAddress).toEqual(`${serverAddress}/features`);
  });

  test("emit a fake event", () => {
    const client = fakeConfig.connect();
    const eventSourceClient = client.eventSourceClient;
    eventSourceClient.apiClient.fakeEmitMessage();
    expect(eventSourceClient.features).toHaveProperty('show button');
    expect(eventSourceClient.features).toHaveProperty('show button.key', 'show button');
  });

  test("client with context", () => {
    fakeConfig.connect();
    const clientWithContext = fakeConfig.withContext();
    expect(clientWithContext.context).toHaveProperty('userKey');

    // retrieve the feature
    clientWithContext.eventSourceClient.apiClient.fakeEmitMessage();

    // current key is 'user123'
    expect((FakeStrategy.basicHash(clientWithContext.context.getKey()) % 100) / 100).toBeGreaterThan(0.5);
    expect(clientWithContext.getFeature('show button')).toBe(false);

    // set the key to a string that passes the percent requirement
    clientWithContext.context.userKey = 'cde';
    expect((FakeStrategy.basicHash(clientWithContext.context.getKey()) % 100) / 100).toBeLessThanOrEqual(0.5);
    expect(clientWithContext.getFeature('show button')).toBe(true);
  });
});

