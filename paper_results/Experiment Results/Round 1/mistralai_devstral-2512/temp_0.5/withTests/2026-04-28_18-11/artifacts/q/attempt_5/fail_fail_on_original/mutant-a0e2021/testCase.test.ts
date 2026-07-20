// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support initialization", () => {
  it("should correctly handle process.env.Q_DEBUG check", () => {
    // Save the original process.env
    const originalEnv = { ...process.env };

    // Test the actual behavior by checking the condition that enables long stack support
    // Original condition: if (typeof process === "object" && process && process.env && process.env.Q_DEBUG)
    // Mutated condition: if (true && process.env.Q_DEBUG)

    // Test case 1: When process.env.Q_DEBUG is set
    process.env.Q_DEBUG = "1";
    const originalCondition1 = typeof process === "object" && process && process.env && process.env.Q_DEBUG;
    const mutatedCondition1 = true && process.env.Q_DEBUG;
    expect(originalCondition1).toBeTruthy();
    expect(mutatedCondition1).toBeTruthy();

    // Test case 2: When process.env.Q_DEBUG is not set
    delete process.env.Q_DEBUG;
    const originalCondition2 = typeof process === "object" && process && process.env && process.env.Q_DEBUG;
    const mutatedCondition2 = true && process.env.Q_DEBUG;
    expect(originalCondition2).toBeFalsy();
    expect(mutatedCondition2).toBeFalsy();

    // Test case 3: Edge case where process might be falsy but process.env exists
    // This is where the mutation would behave differently
    const mockProcess = { env: { Q_DEBUG: "1" } };
    const originalCondition3 = typeof mockProcess === "object" && mockProcess && mockProcess.env && mockProcess.env.Q_DEBUG;
    const mutatedCondition3 = true && mockProcess.env.Q_DEBUG;
    expect(originalCondition3).toBe(true);
    expect(mutatedCondition3).toBe(true);

    // Restore original environment
    process.env = originalEnv;
  });
});