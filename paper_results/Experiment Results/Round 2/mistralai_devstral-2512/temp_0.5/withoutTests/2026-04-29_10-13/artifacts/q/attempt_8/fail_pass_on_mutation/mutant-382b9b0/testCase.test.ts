const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.nodeify", () => {
  it("should return the promise when nodeback is not provided", () => {
    const expectedValue = "test";
    const promise = Q.resolve(expectedValue);
    const result = promise.nodeify();

    // In the original version, nodeify returns the promise when no callback is provided
    // In the mutated version, nodeify is an empty function that returns undefined
    expect(result).toBe(promise);
  });
});