const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library mutation test", () => {
  it("should correctly handle generator return values with Q.async", () => {
    // Test with a generator that uses return statement
    const testGenerator = function*() {
      yield "step1";
      return "final value";
    };

    // Use Q.async to test the behavior
    const promise = Q.async(testGenerator)();

    return promise.then((result: any) => {
      // In the original code, this should return "final value"
      expect(result).toBe("final value");
    });
  });
});