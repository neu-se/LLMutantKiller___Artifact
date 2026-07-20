// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library environment detection", () => {
  it("should properly initialize in browser environment", () => {
    // Save original globals
    const originalWindow = (global as any).window;
    const originalSelf = (global as any).self;

    try {
      // Simulate browser environment
      (global as any).window = {};
      (global as any).self = {};

      // Clear require cache and reload Q
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // Verify Q is available
      expect(typeof Q).toBe("function");

      // Test basic functionality
      const deferred = Q.defer();
      expect(typeof deferred.resolve).toBe("function");

      // Test promise resolution
      return Q.resolve(42).then((value: number) => {
        expect(value).toBe(42);
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