const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation test", () => {
  it("should treat StopIteration as return value in async generators", () => {
    // Create a mock StopIteration exception
    const stopIterationException = {
      toString: () => "[object StopIteration]"
    };

    // Test with StopIteration-like exception that should be treated as return value
    const result = Q.async(function* () {
      throw stopIterationException;
      return "unreachable";
    })();

    return result.then((value: any) => {
      // In original code: StopIteration alone should be treated as return value (undefined)
      // In mutated code: StopIteration alone should NOT be treated as return value (should throw)
      expect(value).toBeUndefined();
    }, (error: any) => {
      // This should not be called in original code but will be called in mutated code
      throw new Error("StopIteration should have been treated as return value");
    });
  });
});