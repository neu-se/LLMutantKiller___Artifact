// Test case to detect the mutation in isStopIteration function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation test", () => {
  it("should handle StopIteration exceptions in generator functions", () => {
    // Create a mock StopIteration exception
    const stopIteration = {
      toString: () => "[object StopIteration]"
    };

    // Test with generator that throws StopIteration
    const promise = Q.async(function* () {
      throw stopIteration;
      return "unreachable";
    })();

    return promise.then(
      (result: any) => {
        // In original code: StopIteration should be caught and treated as return
        // In mutated code: StopIteration won't be caught (AND condition fails)
        expect(result).toBeUndefined();
      },
      (error: any) => {
        // This should only happen in mutated code
        throw error;
      }
    );
  });
});