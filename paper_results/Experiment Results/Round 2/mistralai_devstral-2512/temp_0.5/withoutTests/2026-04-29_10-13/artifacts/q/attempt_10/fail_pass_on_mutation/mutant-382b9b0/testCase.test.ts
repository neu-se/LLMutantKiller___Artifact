const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.nodeify", () => {
  it("should return a thenable object when nodeback is not provided", () => {
    const expectedValue = "test";
    const promise = Q.resolve(expectedValue);
    const result = promise.nodeify();

    // In the original version, nodeify returns the promise (which is thenable)
    // In the mutated version, nodeify returns undefined (not thenable)
    expect(typeof result?.then).toBe('function');
  });
});