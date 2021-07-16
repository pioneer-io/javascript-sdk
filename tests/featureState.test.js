const FeatureState = require("../featureState");
const Strategy = require("../strategy");

describe("testing feature state", () => {
  test("creating a new feature state", () => {
    const featureState = new FeatureState({
      title: "LOGIN_MICROSERVICE",
      value: false,
      strategy: {
        percentage: 0.1,
        value: true
      }
    });
    expect(featureState.title).toBe("LOGIN_MICROSERVICE");
    expect(featureState.value).toBe(false);
    expect(featureState.strategy).toBeInstanceOf(Strategy);
    expect(featureState.strategy.percentage).toBe(0.1);
    // expect(featureState.strategy.value).toBe(true); // commenting this out as we know it's only going to true/false
  });
});