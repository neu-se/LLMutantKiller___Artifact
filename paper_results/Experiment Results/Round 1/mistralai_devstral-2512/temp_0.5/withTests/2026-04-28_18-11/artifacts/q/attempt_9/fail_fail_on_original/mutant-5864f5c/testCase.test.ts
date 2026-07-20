// Test case to detect the mutation in isStopIteration function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation detection", () => {
  it("should correctly handle generator return values in SpiderMonkey-style generators", () => {
    // Create a mock StopIteration object that matches SpiderMonkey's behavior
    const mockStopIteration = {
      value: "return_value",
      toString: () => "[object StopIteration]"
    };

    // Create a generator function that uses Q.return (SpiderMonkey style)
    function* testGenerator() {
      yield "step1";
      Q["return"]("return_value"); // This throws a QReturnValue which should be caught as StopIteration
      yield "should not reach here";
    }

    // Wrap with Q.async
    const asyncFunc = Q.async(testGenerator);

    // Test the behavior
    return asyncFunc().then(
      (result: any) => {
        // In original code, this should resolve with "return_value"
        // because isStopIteration would return true for QReturnValue
        expect(result).toBe("return_value");
      },
      (error: any) => {
        // In mutated code, this would reject because isStopIteration returns false
        // Check if it's a QReturnValue that wasn't handled properly
        if (error && error.value === "return_value") {
          throw new Error("Mutation detected: QReturnValue was not handled as StopIteration");
        }
        throw error;
      }
    );
  });
});