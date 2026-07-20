const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library mutation test", () => {
  it("should correctly handle generator return values", () => {
    // Test the behavior of Q.async with a generator that returns a value
    const testGenerator = function*() {
      yield "step1";
      return "final value";
    };

    // In the original code, this should properly handle the return value
    // In the mutated code, the behavior might be different due to the isStopIteration change
    const promise = Q.async(testGenerator)();

    return promise.then((result: any) => {
      // The result should be "final value" in the original code
      expect(result).toBe("final value");
    });
  });
});