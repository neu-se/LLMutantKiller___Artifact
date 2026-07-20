// Test case to detect the mutation in q.js
import "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q global object initialization", () => {
  it("should initialize Q when only window is defined (not self)", () => {
    // Save original globals
    const originalWindow = (global as any).window;
    const originalSelf = (global as any).self;
    const originalQ = (global as any).Q;

    try {
      // Create environment with only window defined
      (global as any).window = {};
      delete (global as any).self;
      delete (global as any).Q;

      // Clear module cache to force reload
      const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[modulePath];

      // Re-import Q to test initialization logic
      require("../../../../../../../../../../../subject_repositories/q/q.js");

      // Verify Q was initialized
      expect((global as any).Q).toBeDefined();
      expect(typeof (global as any).Q).toBe('function');

      // Verify we can create promises
      const testPromise = (global as any).Q.resolve(42);
      return testPromise.then((value: number) => {
        expect(value).toBe(42);
      });
    } finally {
      // Restore original globals
      (global as any).window = originalWindow;
      (global as any).self = originalSelf;
      (global as any).Q = originalQ;
    }
  });
});