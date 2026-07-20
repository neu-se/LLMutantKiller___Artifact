// Test case to detect the mutation in isStopIteration function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation detection", () => {
  it("should correctly handle generator completion without early return", () => {
    // Test a generator that completes normally without using Q.return()
    // The mutation affects how generator completion is detected
    let completionValue = "not_completed";

    const testPromise = Q.async(function* () {
      yield Q.delay(10);
      completionValue = "completed_normally";
      return "success";
    })();

    return testPromise.then((result: string) => {
      // Verify the generator completed normally
      expect(result).toBe("success");
      expect(completionValue).toBe("completed_normally");

      // Now test that Q.return() works correctly
      return Q.async(function* () {
        Q["return"]("early_return");
        completionValue = "should_not_reach_here";
        return "unreachable";
      })();
    }).then((result: string) => {
      // In original code, Q.return() should cause early return
      // In mutated code, this behavior might be broken
      expect(result).toBe("early_return");
      expect(completionValue).toBe("should_not_reach_here");
    });
  });
});