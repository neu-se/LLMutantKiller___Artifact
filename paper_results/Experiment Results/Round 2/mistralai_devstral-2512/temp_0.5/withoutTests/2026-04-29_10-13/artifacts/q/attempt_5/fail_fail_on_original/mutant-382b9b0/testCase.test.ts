const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.nodeify", () => {
  it("should return undefined when nodeback is provided in the mutated version", () => {
    const expectedValue = "test";
    const promise = Q.resolve(expectedValue);
    const result = promise.nodeify((error: any, value: any) => {
      // This callback should be called in the original version
    });

    // In the original version, nodeify returns the promise when nodeback is provided
    // In the mutated version, nodeify returns undefined (empty function)
    expect(result).not.toBeUndefined();
    expect(result).toBe(promise);
  });
});