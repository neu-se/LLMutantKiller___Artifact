import { createRequire } from "module";

const require = createRequire(import.meta.url);

describe("Q.longStackSupport with Q_DEBUG environment variable", () => {
  it("should set Q.longStackSupport to true when Q_DEBUG environment variable is set", () => {
    const originalQDebug = process.env.Q_DEBUG;

    try {
      // Set Q_DEBUG before requiring the module
      process.env.Q_DEBUG = "1";

      // Clear module cache to force re-evaluation with Q_DEBUG set
      const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[modulePath];

      // Re-require the module with Q_DEBUG set
      const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // In the original code, Q.longStackSupport should be true when Q_DEBUG is set
      // In the mutated code, the body of the if block is empty, so it remains false
      expect(QFresh.longStackSupport).toBe(true);
    } finally {
      // Restore original Q_DEBUG state
      if (originalQDebug === undefined) {
        delete process.env.Q_DEBUG;
      } else {
        process.env.Q_DEBUG = originalQDebug;
      }

      // Clean up module cache
      const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[modulePath];
    }
  });
});