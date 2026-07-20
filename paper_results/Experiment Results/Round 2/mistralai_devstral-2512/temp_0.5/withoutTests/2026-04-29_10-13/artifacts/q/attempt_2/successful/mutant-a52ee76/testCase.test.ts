import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support", () => {
  it("should enable long stack support when Q_DEBUG is set", () => {
    // Save original process.env
    const originalEnv = { ...process.env };

    try {
      // Set Q_DEBUG environment variable
      process.env.Q_DEBUG = "1";

      // Reset module cache to force re-import
      jest.resetModules();

      // Re-import Q to get the fresh configuration
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // Verify that long stack support is enabled
      expect(Q.longStackSupport).toBe(true);
    } finally {
      // Restore original environment
      process.env = originalEnv;
    }
  });
});