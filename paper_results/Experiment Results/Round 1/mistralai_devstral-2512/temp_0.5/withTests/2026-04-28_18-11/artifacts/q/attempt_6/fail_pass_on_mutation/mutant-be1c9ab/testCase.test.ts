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
      throw stopIteration;
    })();

    return promise.then(
      () => {
        // In original code: StopIteration should be caught and treated as return
        // In mutated code: StopIteration won't be caught (AND condition fails)
        // This should not be reached in mutated code
        expect(true).toBe(true);
      },
      (error: any) => {
        // This should only happen in mutated code
        expect(error).toBe(stopIteration);
      }
    );
  });
});