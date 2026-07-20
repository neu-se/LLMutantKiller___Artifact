// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library window detection mutation", () => {
  it("should fail when window is undefined in mutated code", () => {
    // Save original window
    const originalWindow = (global as any).window;

    try {
      // Set window to undefined to test the mutation
      (global as any).window = undefined;

      // Clear require cache and reload Q
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];

      // The mutation changes:
      // typeof window !== "undefined" to typeof window !== ""
      // When window is undefined:
      // - Original: typeof undefined !== "undefined" → false (correct)
      // - Mutated: typeof undefined !== "" → true (incorrect)
      // This causes the mutated code to incorrectly treat undefined window as defined

      // Force evaluation of the mutated condition by requiring Q
      require("../../../../../../../../../../../subject_repositories/q/q.js");

      // In original code, Q should NOT be exposed as global when window is undefined
      // In mutated code, Q WILL be exposed as global due to the incorrect condition
      const hasQGlobal = typeof (global as any).Q === "function";

      // This test should pass on original (hasQGlobal = false) but fail on mutated (hasQGlobal = true)
      expect(hasQGlobal).toBe(false);

      // Additional check to ensure we're testing the right behavior
      if (hasQGlobal) {
        // If Q was exposed (mutated code), verify it's actually Q
        expect(typeof (global as any).Q.defer).toBe("function");
      }
    } finally {
      // Restore original window
      (global as any).window = originalWindow;
      if ((global as any).Q) {
        delete (global as any).Q;
      }
    }
  });
});