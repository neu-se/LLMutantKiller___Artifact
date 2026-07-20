const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done mutation test", () => {
  it("should detect when Q.done returns undefined instead of chaining", () => {
    // The mutation changes Q.done from returning Q(object).done() to returning nothing
    // This test verifies the return value behavior

    const testPromise = Q.resolve(42);
    const result = Q.done(testPromise, () => {}, () => {});

    // In original code, Q.done should return a promise (the result of Q(object).done())
    // In mutated code, it returns undefined
    expect(result).not.toBeUndefined();

    // Verify it has promise-like characteristics
    if (result !== undefined) {
      expect(typeof result.then).toBe('function');
      expect(typeof result.done).toBe('function');
    }
  });
});