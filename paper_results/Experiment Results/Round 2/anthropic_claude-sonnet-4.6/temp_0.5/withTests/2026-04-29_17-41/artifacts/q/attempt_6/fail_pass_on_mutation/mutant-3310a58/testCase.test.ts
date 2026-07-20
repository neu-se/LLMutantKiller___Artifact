describe("Q longStackSupport initialization", () => {
  it("should set longStackSupport to true when Q_DEBUG environment variable is set", () => {
    const qPath = require.resolve("../../../../../../../../../../../../../subject_repositories/q/q.js");
    const originalQDebug = process.env.Q_DEBUG;

    try {
      process.env.Q_DEBUG = "1";
      delete require.cache[qPath];
      const Q = require("../../../../../../../../../../../../../subject_repositories/q/q.js");
      expect(Q.longStackSupport).toBe(true);
    } finally {
      if (originalQDebug === undefined) {
        delete process.env.Q_DEBUG;
      } else {
        process.env.Q_DEBUG = originalQDebug;
      }
      delete require.cache[qPath];
      require("../../../../../../../../../../../../../subject_repositories/q/q.js");
    }
  });
});