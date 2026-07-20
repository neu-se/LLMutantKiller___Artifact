const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.finally mutation test", () => {
  it("should reject when callback is not a function", () => {
    const promise = Q.resolve(42);
    const invalidCallback = {}; // Not a function

    // The original code should reject with "Q can't apply finally callback"
    // The mutated code would incorrectly treat this as a valid callback
    return expect(promise.finally(invalidCallback)).rejects.toThrow("Q can't apply finally callback");
  });
});