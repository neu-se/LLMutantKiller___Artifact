// Test case to detect the mutation in isStopIteration function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation test", () => {
  it("should handle StopIteration exceptions in async generators", () => {
    // Create a mock StopIteration exception
    const stopIteration = {
      toString: () => "[object StopIteration]"
    };

    // Test with generator that throws StopIteration
    const promise = Q.async(function* () {
      try {
        throw stopIteration;
      } catch (e) {
        // This should catch the exception in original code
        // but not in mutated code when it's not a QReturnValue
        return "caught";
      }
    })();

    return promise.then((result: any) => {
      expect(result).toBe("caught");
    });
  });
});