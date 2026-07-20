// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support configuration", () => {
  it("should enable long stack support when Q_DEBUG environment variable is set", () => {
    // Store original environment
    const originalEnv = process.env.Q_DEBUG;
    const originalLongStackSupport = Q.longStackSupport;

    // Set environment variable to enable long stack support
    process.env.Q_DEBUG = "1";

    // The mutation removes the assignment `Q.longStackSupport = true`
    // We need to test this by checking if the configuration was properly set
    // Since the module is already loaded, we need to manually check the condition

    // Manually check the condition that should enable long stack support
    const shouldEnableLongStack = typeof process === "object" && process && process.env && process.env.Q_DEBUG;

    // In the original code, this condition would set Q.longStackSupport = true
    // In the mutated code, the assignment is missing
    if (shouldEnableLongStack) {
      // This is where the mutation occurs - the assignment is missing
      // We can detect this by checking if longStackSupport was actually set
      expect(Q.longStackSupport).toBe(true);
    }

    // Clean up
    process.env.Q_DEBUG = originalEnv;
    Q.longStackSupport = originalLongStackSupport;
  });
});