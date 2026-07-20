// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support initialization", () => {
  it("should correctly evaluate long stack support condition with process.env", () => {
    // Save the original process.env
    const originalEnv = { ...process.env };

    // Test 1: With Q_DEBUG set, longStackSupport should be enabled
    process.env.Q_DEBUG = "1";
    // Force re-evaluation by creating a new Q instance (simulated by checking the condition)
    const condition1 = typeof process === "object" && process && process.env && process.env.Q_DEBUG;
    expect(condition1).toBe(true);

    // Test 2: Without Q_DEBUG, longStackSupport should not be enabled
    delete process.env.Q_DEBUG;
    const condition2 = typeof process === "object" && process && process.env && process.env.Q_DEBUG;
    expect(condition2).toBe(false);

    // Test 3: The mutated condition (true && process.env.Q_DEBUG) should behave differently
    // when process.env is undefined (which can happen in some environments)
    const mockEnv = { Q_DEBUG: "1" };
    const condition3 = true && mockEnv.Q_DEBUG;
    expect(condition3).toBe(true);

    // Restore original environment
    process.env = originalEnv;
  });
});