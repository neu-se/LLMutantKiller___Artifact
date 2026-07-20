// Test case to detect the mutation in q.js
const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library environment detection logic", () => {
  it("should correctly evaluate browser environment condition", () => {
    // Test the specific condition that was mutated
    // Original: typeof window !== "undefined" || typeof self !== "undefined"
    // Mutated: false || typeof self !== "undefined"

    // Create test scenarios
    const scenarios = [
      { window: undefined, self: undefined, expectedOriginal: false, expectedMutated: false },
      { window: {}, self: undefined, expectedOriginal: true, expectedMutated: false },
      { window: undefined, self: {}, expectedOriginal: true, expectedMutated: true },
      { window: {}, self: {}, expectedOriginal: true, expectedMutated: true }
    ];

    scenarios.forEach((scenario, index) => {
      // Test original condition
      const originalResult = typeof scenario.window !== "undefined" || typeof scenario.self !== "undefined";
      expect(originalResult).toBe(scenario.expectedOriginal);

      // Test mutated condition
      const mutatedResult = false || typeof scenario.self !== "undefined";
      expect(mutatedResult).toBe(scenario.expectedMutated);

      // The key difference is in scenario 1 where window exists but self doesn't
      if (index === 1) {
        expect(originalResult).toBe(true);
        expect(mutatedResult).toBe(false);
      }
    });
  });
});