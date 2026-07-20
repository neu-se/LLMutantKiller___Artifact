import * as Q from "./q";

describe("Q long stack support", () => {
  it("should enable longStackSupport when Q_DEBUG environment variable is set", () => {
    // Save original process.env and Q.longStackSupport
    const originalEnv = process.env;
    const originalLongStackSupport = Q.longStackSupport;

    try {
      // Set Q_DEBUG environment variable
      process.env.Q_DEBUG = "1";

      // Reset Q module to pick up new environment variable
      delete require.cache[require.resolve("./q")];
      const freshQ = require("./q");

      // Verify longStackSupport was enabled
      expect(freshQ.longStackSupport).toBe(true);

    } finally {
      // Restore original environment and Q state
      process.env = originalEnv;
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});