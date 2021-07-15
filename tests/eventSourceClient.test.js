const EventSourceClient = require('../eventSourceClient');
const EventSource = require('eventsource');
const FakeEventSource = require('../mocks/fakeEventSource');
const FeatureState = require('../featureState');

const Config = require('../config');

describe("testing eventSourceClient", () => {
  const serverAddress = "http://localhost:3030";
  const sdkKey = "JazzyElksRule";
  let newConfig = new Config(serverAddress, sdkKey);
  let client;

  const options = {
    headers: { Authorization: newConfig.sdkKey}
  }
  
  beforeEach(() => {
    client = new EventSourceClient(newConfig);
  });

  afterEach(() => {
    client.apiClient.close();
  });

  test("creating new instance", () => {
    expect(client).toMatchObject({});
    expect(client.features).toMatchObject({});
    expect(client.apiClient).toBeInstanceOf(EventSource);
  });

  test("injecting fake eventsource", () => {
    client.apiClient.close();
    client.apiClient = new FakeEventSource(newConfig.getServerAddress(), options);
    client.start();
    client.apiClient.fakeEmitMessage();
    expect(typeof client.apiClient.onmessage).toBe('function');
    expect(typeof client.apiClient.onerror).toBe('function');
  });

  test("fake emit message", () => {
    client.apiClient.close();
    client.apiClient = new FakeEventSource(newConfig.getServerAddress(), options);
    client.start();
    client.apiClient.fakeEmitMessage();
    expect(client.features["LOGIN_MICROSERVICE"].value).toBe(false);
  });

  test('get a feature that does not exist without default value', () => {
    expect(() => client.getFeature('DOES_NOT_EXIST')).toThrow();
    expect(() => client.getFeature('DOES_NOT_EXIST', null)).toThrow();
    expect(() => client.getFeature('DOES_NOT_EXIST', undefined)).toThrow();
  });

  test('get a feature that does not exist with a default value', () => {
    expect(client.getFeature('DOES_NOT_EXIST', false)).toBe(false);
    expect(client.getFeature('DOES_NOT_EXIST', true)).toBe(true);
  });

  test('handle all features', () => {
    const allFeatures = JSON.stringify([
      {
        title: "LOGIN_MICROSERVICE",
        is_active: false,
        strategy: {
          percentage: 0.5,
          value: true
        }
      }
    ]);
    client.handleAllFeatures(allFeatures);
    expect(client.hasData).toBe(true);
    expect(client.features["LOGIN_MICROSERVICE"].value).toBe(false);
  });

  test('test getFeatureState', () => {
    expect(client.getFeatureState("LOGIN_MICROSERVICE")).toBe(undefined);
    client.apiClient.close();
    client.apiClient = new FakeEventSource(newConfig.getServerAddress(), options);
    client.start();
    client.apiClient.fakeEmitMessage();
    expect(client.getFeatureState("LOGIN_MICROSERVICE")).toBeInstanceOf(FeatureState);
  });
});