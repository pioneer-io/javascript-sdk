const Context = require('../context');

describe("testing context", () => {
  test("creating a new context", () => {
    const context = new Context({ userKey: "user123" });
    expect(context.userKey).toBe("user123");
  });

  test("the getKey method", () => {
    const context = new Context({ userKey: "user123" });
    expect(context.getKey()).toBe("user123");
  });
});