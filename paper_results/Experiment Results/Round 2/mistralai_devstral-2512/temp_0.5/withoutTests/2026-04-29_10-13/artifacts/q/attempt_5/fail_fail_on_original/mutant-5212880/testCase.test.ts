const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done mutation test", () => {
  it("should expose the mutation in Q.done implementation", () => {
    // The mutation changes Q.done from returning Q(object).done() to returning nothing
    // This test checks if Q.done returns a value (original) or undefined (mutated)

    const testObj = { value: 42 };
    const result = Q.done(testObj, () => {}, () => {});

    // In original code, this should return a promise (truthy)
    // In mutated code, this returns undefined (falsy)
    expect(result).toBeTruthy();

    // Additional check - verify it's actually a promise-like object
    if (result) {
      expect(typeof result.done).toBe('function');
    }
  });
});