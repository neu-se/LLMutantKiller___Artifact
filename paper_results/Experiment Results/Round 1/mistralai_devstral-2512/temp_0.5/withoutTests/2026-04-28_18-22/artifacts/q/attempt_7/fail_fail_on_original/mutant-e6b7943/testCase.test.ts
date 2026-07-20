const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library mutation test", () => {
  it("should correctly identify StopIteration exceptions in generator handling", () => {
    // Create a mock StopIteration exception that mimics what SpiderMonkey generates
    const stopIterationException = {
      toString: () => "[object StopIteration]",
      value: "generator return value"
    };

    // Test with a generator that throws StopIteration
    const testGenerator = function*() {
      yield "step1";
      // This mimics what older SpiderMonkey does when returning from a generator
      throw stopIterationException;
    };

    // Use Q.async to test the behavior
    const promise = Q.async(testGenerator)();

    return promise.then((result: any) => {
      // In the original code, this should properly handle StopIteration and return the value
      expect(result).toBe("generator return value");
    });
  });
});