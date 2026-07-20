import { describe, it, expect } from "@jest/globals";

describe("Q.longStackSupport with Q_DEBUG environment variable", () => {
  it("should set Q.longStackSupport to true when Q_DEBUG is set", () => {
    // Set Q_DEBUG environment variable before requiring the module
    const originalQDebug = process.env.Q_DEBUG;
    process.env.Q_DEBUG = "1";

    // Clear the module cache so Q is re-evaluated with Q_DEBUG set
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];

    let Q: any;
    try {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      // Restore the environment variable
      if (originalQDebug === undefined) {
        delete process.env.Q_DEBUG;
      } else {
        process.env.Q_DEBUG = originalQDebug;
      }
      // Restore the original cached module
      delete require.cache[modulePath];
    }

    expect(Q.longStackSupport).toBe(true);
  });
});