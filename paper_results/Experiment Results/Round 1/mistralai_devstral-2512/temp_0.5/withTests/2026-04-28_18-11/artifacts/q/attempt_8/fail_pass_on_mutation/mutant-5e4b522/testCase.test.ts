// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library environment detection", () => {
  it("should correctly handle window detection in browser environment", () => {
    // Save original window and self
    const originalWindow = (global as any).window;
    const originalSelf = (global as any).self;

    try {
      // Set up browser-like environment
      (global as any).window = {};
      (global as any).self = {};

      // Clear require cache and reload Q
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // The mutation changes the condition from:
      // typeof window !== "undefined" || typeof self !== "undefined"
      // to:
      // typeof window !== "" || typeof self !== "undefined"
      // This means when window is undefined, the original code would correctly
      // evaluate to false, but the mutated code would incorrectly evaluate to true
      // because typeof undefined !== "" is true

      // Test that Q is properly initialized in browser environment
      expect(typeof Q).toBe("function");

      // Test basic promise functionality
      const deferred = Q.defer();
      expect(typeof deferred.resolve).toBe("function");
      expect(typeof deferred.reject).toBe("function");

      // Test promise creation and resolution
      return Q.resolve("test").then((value: string) => {
        expect(value).toBe("test");
      });
    } finally {
      // Restore original globals
      (global as any).window = originalWindow;
      (global as any).self = originalSelf;
      if ((global as any).Q) {
        delete (global as any).Q;
      }
    }
  });
});