const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.nodeify", () => {
  it("should return the promise when nodeback is provided", () => {
    const expectedValue = "test";
    const promise = Q.resolve(expectedValue);
    const result = promise.nodeify((error: any, value: any) => {
      // This callback should be called in the original version
    });

    // In the original version, nodeify returns the promise
    // In the mutated version, nodeify returns undefined (empty function)
    expect(result).toBe(promise);
  });
});