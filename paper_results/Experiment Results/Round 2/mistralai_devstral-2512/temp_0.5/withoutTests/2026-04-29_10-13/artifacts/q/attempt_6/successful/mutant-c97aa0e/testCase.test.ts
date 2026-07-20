const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.any", () => {
  it("should have any method that returns a promise", () => {
    const promise = Q.resolve(42);
    expect(typeof promise.any).toBe("function");
    const result = promise.any();
    expect(result).toBeDefined();
    expect(typeof result.then).toBe("function");
  });
});