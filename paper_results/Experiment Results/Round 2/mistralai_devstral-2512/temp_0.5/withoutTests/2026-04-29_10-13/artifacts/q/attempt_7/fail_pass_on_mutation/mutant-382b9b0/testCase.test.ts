const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.nodeify", () => {
  it("should properly handle nodeback callback when promise resolves", (done) => {
    const expectedValue = "test";
    const promise = Q.resolve(expectedValue);

    promise.nodeify((error: any, value: any) => {
      expect(error).toBeNull();
      expect(value).toBe(expectedValue);
      done();
    });

    // The test will timeout if nodeify doesn't call the callback
    // In the mutated version, nodeify is an empty function that doesn't call the callback
  });
});