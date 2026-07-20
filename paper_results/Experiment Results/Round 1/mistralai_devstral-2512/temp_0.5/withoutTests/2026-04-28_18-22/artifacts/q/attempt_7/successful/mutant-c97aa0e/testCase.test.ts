const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.any", () => {
  it("should have Promise.prototype.any method that returns a promise", () => {
    const promise = Q.resolve([1, 2, 3]);
    const result = promise.any();
    expect(result).toBeDefined();
    expect(typeof result.then).toBe('function');
    expect(result.inspect).toBeDefined();
  });
});