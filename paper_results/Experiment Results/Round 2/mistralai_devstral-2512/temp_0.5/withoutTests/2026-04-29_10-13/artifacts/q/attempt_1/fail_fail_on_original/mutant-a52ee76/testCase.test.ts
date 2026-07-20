import { Q } from "./q.js";

describe("Q long stack support", () => {
  it("should enable long stack support when Q_DEBUG is set", () => {
    // Save original process.env
    const originalEnv = { ...process.env };

    try {
      // Set Q_DEBUG environment variable
      process.env.Q_DEBUG = "1";

      // Re-import Q to get the fresh configuration
      // Note: In a real test environment, you might need to use jest.resetModules()
      // or similar to clear the module cache. For this test, we'll assume the module
      // can be re-imported or that the test runner handles this.
      const Q = require("./q.js");

      // Verify that long stack support is enabled
      expect(Q.longStackSupport).toBe(true);
    } finally {
      // Restore original environment
      process.env = originalEnv;
    }
  });
});