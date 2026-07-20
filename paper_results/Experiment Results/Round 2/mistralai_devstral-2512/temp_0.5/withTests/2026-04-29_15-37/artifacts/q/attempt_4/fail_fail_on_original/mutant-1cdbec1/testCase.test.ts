// Test case to detect the mutation in q.js
import "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q global object initialization", () => {
  it("should initialize Q globally when only window is defined", () => {
    // Save original globals
    const originalWindow = global.window;
    const originalSelf = global.self;
    const originalQ = global.Q;

    try {
      // Create environment with only window defined
      global.window = {} as any;
      delete (global as any).self;

      // Clear the Q global if it exists
      delete (global as any).Q;

      // Load Q in this environment
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
      global.window = originalWindow;
      global.self = originalSelf;
      global.Q = originalQ;
    }
  });
});