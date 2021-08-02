const Strategy = require("../strategy");
const Context = require("../context");

describe("testing strategy", () => {
  test("creating a new strategy", () => {
    const strategy = new Strategy({ percentage: 0.1, value: true });
    expect(strategy.percentage).toBe(0.1);
  });

  test("hashBasedPercentage of user123", () => {
    const strategy = new Strategy({ percentage: 10, value: true });
    expect(strategy.getHashBasedPercentage("user123")).toBe(98);
  });

  test("hashBasedPercentage of dfb", () => {
    const strategy = new Strategy({ percentage: 10, value: true });
    expect(strategy.getHashBasedPercentage("dfb")).toBe(1);
  });

  test("calculating a strategy value that does not meet the percentage", () => {
    const strategy = new Strategy({ percentage: 10, value: true });
    const context = new Context({ userKey: "user123" });
    expect(strategy.calculate(context)).toBe(false);
  });

  test("calculating a strategy value that does meet the percentage", () => {
    const strategy = new Strategy({ percentage: 10, value: true });
    const context = new Context({ userKey: "dfb" });
    expect(strategy.calculate(context)).toBe(true);
  });
});
