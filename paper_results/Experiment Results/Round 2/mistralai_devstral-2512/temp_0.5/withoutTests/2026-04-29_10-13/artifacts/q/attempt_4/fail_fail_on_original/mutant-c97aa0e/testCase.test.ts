const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.any", () => {
  it("should return a promise when called on a promise instance", () => {
    const promise = Q.resolve(42);
    const result = promise.any();
    expect(result).toBeInstanceOf(Q);
    return result.then(value => {
      expect(value).toBe(42);
    });
  });
});