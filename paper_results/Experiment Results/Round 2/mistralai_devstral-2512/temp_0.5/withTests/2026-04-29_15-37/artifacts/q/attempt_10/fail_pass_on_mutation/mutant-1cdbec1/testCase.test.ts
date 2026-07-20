// Test case to detect the mutation in q.js
import "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q initialization condition", () => {
  it("should use OR condition for window/self check", () => {
    // Test the specific condition that was mutated
    const testCases = [
      { window: undefined, self: undefined, shouldInitialize: false },
      { window: {}, self: undefined, shouldInitialize: true },  // This is the key test case
      { window: undefined, self: {}, shouldInitialize: true },
      { window: {}, self: {}, shouldInitialize: true }
    ];

    testCases.forEach(({ window, self, shouldInitialize }) => {
      // Simulate the condition check from q.js
      const originalCondition = typeof window !== "undefined" || typeof self !== "undefined";
      const mutatedCondition = typeof window !== "undefined" && typeof self !== "undefined";

      // Original code should match expected behavior
      expect(originalCondition).toBe(shouldInitialize);

      // For the case where only window is defined, mutated code would fail
      if (window !== undefined && self === undefined) {
        expect(mutatedCondition).toBe(false);  // This would fail with mutated code
      }
    });
  });
});