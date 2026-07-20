import { describe, it, expect } from "@jest/globals";

describe("Q.longStackSupport with Q_DEBUG environment variable", () => {
  it("should set Q.longStackSupport to true when Q_DEBUG environment variable is set", () => {
    // Set Q_DEBUG before requiring the module
    const originalQDebug = process.env.Q_DEBUG;
    process.env.Q_DEBUG = "1";

    // Clear the module cache so we get a fresh load with the env var set
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[qPath];

    let Q: any;
    try {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      // Restore original env state
      if (originalQDebug === undefined) {
        delete process.env.Q_DEBUG;
      } else {
        process.env.Q_DEBUG = originalQDebug;
      }
      // Clean up cache after test
      delete require.cache[qPath];
    }

    expect(Q.longStackSupport).toBe(true);
  });
});