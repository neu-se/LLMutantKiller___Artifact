// Test case to detect the mutation in isStopIteration function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation detection", () => {
  it("should correctly handle StopIteration exceptions in generator context", () => {
    // Create a mock StopIteration object that would be thrown by SpiderMonkey generators
    const mockStopIteration = {
      value: "test_value",
      toString: () => "[object StopIteration]"
    };

    // Create a generator function that throws our mock StopIteration
    function* testGenerator() {
      yield "first";
      throw mockStopIteration;
    }

    // Use Q.async to wrap the generator
    const asyncFunc = Q.async(testGenerator);

    // Call the async function and observe the behavior
    return asyncFunc().then(
      (result: any) => {
        // In the original code, this should resolve with the value
        expect(result).toBe("test_value");
      },
      (error: any) => {
        // In the mutated code, this would reject because isStopIteration returns false
        // Check if this is our mock StopIteration that wasn't handled properly
        if (error && error.toString && error.toString() === "[object StopIteration]") {
          throw new Error("Mutation detected: StopIteration was not properly handled");
        }
        // For other errors, rethrow
        throw error;
      }
    );
  });
});