// Test case to detect the mutation in isStopIteration function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation detection", () => {
  it("should correctly handle QReturnValue in generators", () => {
    // Test the behavior when Q.return() is used in a generator
    // The mutation affects how QReturnValue exceptions are detected
    const testPromise = Q.async(function* () {
      try {
        Q["return"]("test value");
        return "should_not_reach_here";
      } catch (e) {
        // In original code, QReturnValue should be caught here
        // In mutated code, the behavior changes
        if (e && e.value === "test value") {
          return "correctly_caught";
        }
        return "incorrectly_caught";
      }
    })();

    return testPromise.then((result: string) => {
      // This test verifies that QReturnValue is properly handled
      // The mutation would cause incorrect handling
      expect(result).toBe("correctly_caught");
    });
  });
});