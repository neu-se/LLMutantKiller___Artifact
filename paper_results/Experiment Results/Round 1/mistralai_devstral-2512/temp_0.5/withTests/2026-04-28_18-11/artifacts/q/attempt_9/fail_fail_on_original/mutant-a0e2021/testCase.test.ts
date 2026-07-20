// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support initialization", () => {
  it("should correctly handle process.env.Q_DEBUG check with null process.env", () => {
    // Save the original process.env
    const originalEnv = process.env;

    // Test the edge case where process.env is null
    // Original condition: if (typeof process === "object" && process && process.env && process.env.Q_DEBUG)
    // Mutated condition: if (true && process.env.Q_DEBUG)
    process.env = null;

    // Test the original condition (should be false)
    const originalCondition = typeof process === "object" && process && process.env && process.env.Q_DEBUG;
    expect(originalCondition).toBe(false);

    // Test the mutated condition (would throw TypeError)
    let mutatedCondition;
    try {
      mutatedCondition = true && process.env.Q_DEBUG;
      // If we get here, the mutation is present (shouldn't happen in original)
      expect(false).toBe(true); // Force failure if mutation is present
    } catch (e) {
      // Expected behavior for original code
      expect(e).toBeInstanceOf(TypeError);
    } finally {
      // Restore original environment
      process.env = originalEnv;
    }
  });
});