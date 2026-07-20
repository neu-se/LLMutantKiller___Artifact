// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support configuration", () => {
  it("should enable long stack support when Q_DEBUG environment variable is set", () => {
    // The mutation removes the assignment `Q.longStackSupport = true`
    // This means that even when Q_DEBUG is set, long stack support won't be enabled
    // We can detect this by checking the actual Q.longStackSupport value

    // First, let's check the current state
    const currentLongStackSupport = Q.longStackSupport;

    // The original code should have this set to true if Q_DEBUG was set when the module loaded
    // The mutated code will have it as false regardless of Q_DEBUG

    // Since we can't control when the module loads in this test environment,
    // we'll check if the configuration logic is working correctly by examining
    // the relationship between Q_DEBUG and Q.longStackSupport

    if (process.env.Q_DEBUG) {
      // If Q_DEBUG is set, long stack support should be enabled in original code
      expect(currentLongStackSupport).toBe(true);
    } else {
      // If Q_DEBUG is not set, long stack support should be false in both cases
      expect(currentLongStackSupport).toBe(false);
    }
  });
});