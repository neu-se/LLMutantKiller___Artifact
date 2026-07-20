// Test case to detect the mutation in isStopIteration function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation detection", () => {
  it("should correctly distinguish StopIteration from other exceptions", () => {
    // Create a mock StopIteration exception (simulating legacy SpiderMonkey behavior)
    const stopIteration = { toString: () => "[object StopIteration]" };

    // Create a regular error that should NOT be considered StopIteration
    const regularError = new Error("This is a regular error");

    // Test that only StopIteration is caught by the generator handler
    // In the original code, only stopIteration should be caught
    // In the mutated code, both will be caught (incorrectly)
    const testStopIteration = Q.async(function* () {
      try {
        throw stopIteration;
      } catch (e) {
        return "stop_iteration_caught";
      }
      return "not_caught";
    })();

    const testRegularError = Q.async(function* () {
      try {
        throw regularError;
      } catch (e) {
        return "regular_error_caught";
      }
      return "not_caught";
    })();

    return Promise.all([testStopIteration, testRegularError]).then(([result1, result2]: [string, string]) => {
      // In original code: stopIteration should be caught, regularError should not
      // In mutated code: both will be caught
      expect(result1).toBe("stop_iteration_caught");
      expect(result2).toBe("not_caught");
    });
  });
});