// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q global object initialization", () => {
  it("should initialize Q when only window is defined (not self)", () => {
    // Save original globals
    const originalWindow = global.window;
    const originalSelf = global.self;

    try {
      // Create environment with only window defined
      global.window = {};
      delete global.self;

      // Clear module cache to force reload
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];

      // Re-import Q to test initialization logic
      const { Q: FreshQ } = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // If Q was initialized, it should be available
      expect(FreshQ).toBeDefined();
      expect(typeof FreshQ).toBe('function');

      // Verify we can create promises
      const testPromise = FreshQ.resolve(42);
      return testPromise.then(value => {
        expect(value).toBe(42);
      });
    } finally {
      // Restore original globals
      global.window = originalWindow;
      global.self = originalSelf;
    }
  });
});