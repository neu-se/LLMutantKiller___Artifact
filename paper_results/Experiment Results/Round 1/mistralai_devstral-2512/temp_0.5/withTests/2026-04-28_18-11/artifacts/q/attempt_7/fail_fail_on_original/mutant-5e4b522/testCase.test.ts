// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library browser environment detection", () => {
  it("should detect window object correctly", () => {
    // Save original window
    const originalWindow = (global as any).window;

    try {
      // Test case 1: window is undefined (Node.js environment)
      (global as any).window = undefined;
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      require("../../../../../../../../../../../subject_repositories/q/q.js");
      const hasQ1 = typeof (global as any).Q === "function";

      // Test case 2: window is defined (browser environment)
      (global as any).window = {};
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      require("../../../../../../../../../../../subject_repositories/q/q.js");
      const hasQ2 = typeof (global as any).Q === "function";

      // The mutation changes the condition from checking if window is undefined
      // to checking if window is not an empty string, which would incorrectly
      // treat undefined window as a browser environment
      // In the original code:
      // - When window is undefined, Q should NOT be exposed as global
      // - When window is defined, Q should be exposed as global
      expect(hasQ1).toBe(false);
      expect(hasQ2).toBe(true);
    } finally {
      // Restore original window
      (global as any).window = originalWindow;
      if ((global as any).Q) {
        delete (global as any).Q;
      }
    }
  });
});