const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.nodeify", () => {
  it("should properly chain when nodeback is not provided", () => {
    const expectedValue = "test";
    const promise = Q.resolve(expectedValue);
    const result = promise.nodeify();

    // In the original version, nodeify returns the promise which can be chained
    // In the mutated version, nodeify returns undefined which cannot be chained
    return result.then((value: any) => {
      expect(value).toBe(expectedValue);
    });
  });
});