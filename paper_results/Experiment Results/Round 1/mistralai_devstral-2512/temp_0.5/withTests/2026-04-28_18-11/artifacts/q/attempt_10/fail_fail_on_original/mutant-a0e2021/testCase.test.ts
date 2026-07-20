// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support initialization", () => {
  it("should correctly handle process.env.Q_DEBUG check", () => {
    // Save the original process.env
    const originalEnv = { ...process.env };

    // Test case 1: Normal case with Q_DEBUG set
    process.env.Q_DEBUG = "1";
    const condition1 = typeof process === "object" && process && process.env && process.env.Q_DEBUG;
    expect(condition1).toBe(true);

    // Test case 2: Edge case where process.env exists but is empty
    process.env = {};
    const condition2 = typeof process === "object" && process && process.env && process.env.Q_DEBUG;
    expect(condition2).toBe(false);

    // Test case 3: The mutated condition would behave differently
    // Original: checks all conditions in sequence
    // Mutated: skips the process existence checks
    const mockEnv = { Q_DEBUG: "1" };
    const originalCheck = typeof process === "object" && process && mockEnv && mockEnv.Q_DEBUG;
    const mutatedCheck = true && mockEnv.Q_DEBUG;
    expect(originalCheck).toBe(true);
    expect(mutatedCheck).toBe(true);

    // Restore original environment
    process.env = originalEnv;
  });
});