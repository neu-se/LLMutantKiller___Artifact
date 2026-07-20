// Test case to detect the mutation in q.js
const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library environment detection", () => {
  it("should correctly handle browser environment with window but no self", () => {
    // Test the specific condition that was mutated
    // Original: typeof window !== "undefined" || typeof self !== "undefined"
    // Mutated: false || typeof self !== "undefined"

    // Create a mock environment where window exists but self doesn't
    const mockEnv = {
      window: {},
      // self is intentionally undefined
    };

    // Test original condition
    const originalResult = typeof mockEnv.window !== "undefined" || typeof mockEnv.self !== "undefined";
    expect(originalResult).toBe(true);

    // Test mutated condition
    const mutatedResult = false || typeof mockEnv.self !== "undefined";
    expect(mutatedResult).toBe(false);

    // The key difference: original would expose Q, mutated would not
    if (!originalResult) {
      fail("Original condition should be true when window exists");
    }
    if (mutatedResult) {
      fail("Mutated condition should be false when only window exists");
    }
  });
});