// Test case to detect the mutation in isStopIteration function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation detection", () => {
  it("should correctly handle StopIteration exceptions in async generators", () => {
    // Create a mock StopIteration object that mimics SpiderMonkey's behavior
    const mockStopIteration = {
      value: "test_result",
      toString: () => "[object StopIteration]"
    };

    // Create a generator function that throws our mock StopIteration
    function* testGenerator() {
      yield "step1";
      throw mockStopIteration;
    }

    // Wrap the generator with Q.async
    const asyncFunc = Q.async(testGenerator);

    // Test the behavior
    return asyncFunc().then(
      (result: any) => {
        // In original code, this should resolve with the StopIteration value
        expect(result).toBe("test_result");
      },
      (error: any) => {
        // In mutated code, this would reject
        // Check if the error is our mock StopIteration
        if (error && error.value === "test_result") {
          throw new Error("Mutation detected: StopIteration was rejected instead of resolved");
        }
        // For other errors, just rethrow
        throw error;
      }
    );
  });
});