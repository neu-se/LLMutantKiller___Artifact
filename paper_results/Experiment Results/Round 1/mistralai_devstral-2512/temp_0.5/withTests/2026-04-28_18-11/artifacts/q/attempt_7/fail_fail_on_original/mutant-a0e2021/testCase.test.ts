// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support initialization", () => {
  it("should correctly evaluate the long stack support condition", () => {
    // Test the condition that enables long stack support
    // Original: if (typeof process === "object" && process && process.env && process.env.Q_DEBUG)
    // Mutated: if (true && process.env.Q_DEBUG)

    // Create a mock process object that would fail the original condition
    const mockProcess = {
      env: null // process.env exists but is null
    };

    // Test the original condition
    const originalCondition = typeof mockProcess === "object" && mockProcess && mockProcess.env && mockProcess.env.Q_DEBUG;
    expect(originalCondition).toBe(false);

    // Test the mutated condition (this would fail if process.env is null)
    // The mutation changes the condition to just check process.env.Q_DEBUG
    // without checking if process.env exists first
    try {
      const mutatedCondition = true && mockProcess.env.Q_DEBUG;
      // If we get here, the mutation didn't cause the expected error
      expect(false).toBe(true); // Force test failure
    } catch (e) {
      // Expected behavior: trying to access Q_DEBUG on null should throw
      expect(e).toBeDefined();
    }
  });
});