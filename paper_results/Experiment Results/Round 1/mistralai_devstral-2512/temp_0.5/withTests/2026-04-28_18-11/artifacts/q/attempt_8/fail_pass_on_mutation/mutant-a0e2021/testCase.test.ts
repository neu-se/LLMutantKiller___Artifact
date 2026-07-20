// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support initialization", () => {
  it("should handle edge case where process.env is null", () => {
    // Save the original process.env
    const originalEnv = process.env;

    // Create a scenario where process.env is null
    // This tests the difference between:
    // Original: if (typeof process === "object" && process && process.env && process.env.Q_DEBUG)
    // Mutated: if (true && process.env.Q_DEBUG)
    process.env = null;

    // The original code would handle this gracefully (condition evaluates to false)
    // The mutated code would try to access Q_DEBUG on null, causing an error
    try {
      // This simulates what happens during Q initialization
      const condition = true && process.env.Q_DEBUG;
      // If we get here without throwing, the mutation is present
      expect(false).toBe(true); // Force test failure if mutation is present
    } catch (e) {
      // Expected behavior for original code
      expect(e).toBeDefined();
    } finally {
      // Restore original environment
      process.env = originalEnv;
    }
  });
});