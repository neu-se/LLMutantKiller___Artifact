// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library window detection", () => {
  it("should correctly detect when window is undefined", () => {
    // Save original window
    const originalWindow = (global as any).window;

    try {
      // Set window to undefined to simulate Node.js environment
      (global as any).window = undefined;

      // Clear require cache and reload Q
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      require("../../../../../../../../../../../subject_repositories/q/q.js");

      // In the original code, when window is undefined, the condition
      // typeof window !== "undefined" evaluates to false
      // In the mutated code, typeof window !== "" evaluates to true
      // because typeof undefined returns "undefined", and "undefined" !== "" is true
      // This means the mutated code would incorrectly treat undefined window
      // as a browser environment

      // Check if Q was incorrectly exposed as global
      const hasQGlobal = typeof (global as any).Q === "function";

      // In the original code, Q should NOT be exposed as global when window is undefined
      // In the mutated code, Q WILL be exposed as global
      expect(hasQGlobal).toBe(false);
    } finally {
      // Restore original window
      (global as any).window = originalWindow;
      if ((global as any).Q) {
        delete (global as any).Q;
      }
    }
  });
});