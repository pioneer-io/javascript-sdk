const Strategy = require("../strategy");
const FakeContext = require("../mocks/fakeContext");

describe("testing strategy", () => {
  const context = new FakeContext({ userKey: "user123" });
  test("creating a new strategy", () => {
    const strategy = new Strategy({ percentage: 0.1, value: true });
    expect(strategy.percentage).toBe(0.1);
    expect(strategy.value).toBe(true);
  });

  test("hashBasedPercentage of user123", () => {
    const strategy = new Strategy({ percentage: 0.1, value: true });
    expect(strategy.getHashBasedPercentage("user123")).toBe(0.98);
  });

  test("hashBasedPercentage of dfb", () => {
    const strategy = new Strategy({ percentage: 0.1, value: true });
    expect(strategy.getHashBasedPercentage("dfb")).toBe(0.01);
  });

  test("calculating a strategy value that does not meet the percentage", () => {
    const strategy = new Strategy({ percentage: 0.1, value: true });
    const context = new FakeContext({ userKey: "user123" });
    expect(strategy.calculate(context)).toBe(null);
  });

  test("calculating a strategy value that does meet the percentage", () => {
    const strategy = new Strategy({ percentage: 0.1, value: true });
    const context = new FakeContext({ userKey: "dfb" });
    expect(strategy.calculate(context)).toBe(true);
  });
});
