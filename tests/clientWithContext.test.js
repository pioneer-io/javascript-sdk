const ClientWithContext = require("../clientWithContext");
const FakeEventSourceClient = require("../mocks/fakeEventSourceClient");
const FakeConfig = require("../mocks/fakeConfig");
const FakeFeatureState = require("../mocks/fakeFeatureState");
const Context = require('../context');

describe("testing clientWithContext", () => {
  const context = new Context({ userKey: "123" });
  const config = new FakeConfig("http://localhost:3000", "JazzyElksRule");
  const client = new FakeEventSourceClient(config);
  client.features["LOGIN_MICROSERVICE"] = new FakeFeatureState({
    title: "LOGIN_MICROSERVICE",
    value: true,
    strategy: {
      percentage: 0.1,
    }
  });

  client.features["FEATURE_OFF"] = new FakeFeatureState({
    title: "FEATURE_OFF",
    value: false,
    strategy: {
      percentage: 0.1,
    }
  });

  let cwc;

  beforeEach(() => {
    cwc = new ClientWithContext({ context, client, config });
    cwc.context.userKey = "user123";
  });

  test("create a new ClientWithContext", () => {

    expect(typeof cwc.context).toBe('object');
    expect(typeof cwc.client).toBe('object');
    expect(typeof cwc.config).toBe('object');
  });

  test("get feature with strategy", () => {
    expect(cwc.getFeature('LOGIN_MICROSERVICE')).toBe(false);
    cwc.context.userKey = "dfb"; // will hash to 0 percentage
    expect(cwc.getFeature('LOGIN_MICROSERVICE')).toBe(true);
  });

  test("get feature with nonexistent title without default value", () => {
    expect(() => cwc.getFeature('DOES_NOT_EXIST')).toThrow();
  });

  test("get feature with nonexistent title with default value", () => {
    expect(cwc.getFeature('DOES_NOT_EXIST', false)).toBe(false);
    expect(cwc.getFeature('DOES_NOT_EXIST', true)).toBe(true);
  });

  test("get feature for a flag toggled off", () => {
    expect(cwc.getFeature('FEATURE_OFF')).toBe(false);
    cwc.context.userKey = "dfb";
    expect(cwc.getFeature('FEATURE_OFF')).toBe(false);
  });
});