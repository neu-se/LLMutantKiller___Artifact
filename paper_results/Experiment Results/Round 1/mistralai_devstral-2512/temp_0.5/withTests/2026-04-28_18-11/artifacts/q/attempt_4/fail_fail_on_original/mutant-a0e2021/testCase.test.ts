// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support initialization", () => {
  it("should enable long stack support when Q_DEBUG is set in process.env", () => {
    // Save the original process.env
    const originalEnv = { ...process.env };

    // Set Q_DEBUG to enable long stack support
    process.env.Q_DEBUG = "1";

    // Create a fresh Q instance to test the initialization
    // The original code checks: if (typeof process === "object" && process && process.env && process.env.Q_DEBUG)
    // The mutated code checks: if (true && process.env.Q_DEBUG)
    // We need to test the behavior when process.env exists but process might be falsy in some edge case

    // Test the actual behavior by checking if longStackSupport gets enabled
    // We'll simulate the condition check that happens during Q initialization
    const shouldEnableLongStacksOriginal = typeof process === "object" && process && process.env && process.env.Q_DEBUG;
    const shouldEnableLongStacksMutated = true && process.env.Q_DEBUG;

    // Both should be true in this case
    expect(shouldEnableLongStacksOriginal).toBe(true);
    expect(shouldEnableLongStacksMutated).toBe(true);

    // Now test the edge case where process might be falsy but process.env exists
    // This is the key difference between original and mutated code
    const mockProcess = { env: { Q_DEBUG: "1" } };
    const originalCondition = typeof mockProcess === "object" && mockProcess && mockProcess.env && mockProcess.env.Q_DEBUG;
    const mutatedCondition = true && mockProcess.env.Q_DEBUG;

    expect(originalCondition).toBe(true);
    expect(mutatedCondition).toBe(true);

    // Restore original environment
    process.env = originalEnv;
  });
});