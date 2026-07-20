describe("Q module initialization safety", () => {
  it("should not throw when process is null during module initialization", () => {
    const originalProcess = global.process;
    const qPath = require.resolve("../../../../../../../../../../../../../subject_repositories/q/q.js");

    try {
      // typeof null === "object" is true in JS, so the original's
      // `typeof process === "object"` check passes for null,
      // but then `&& process` (falsy) short-circuits safely before accessing .env
      // The mutation replaces that with `true`, so it proceeds to `null.env` => TypeError
      (global as any).process = null;

      delete require.cache[qPath];

      let threwError = false;
      try {
        require("../../../../../../../../../../../../../subject_repositories/q/q.js");
      } catch (e) {
        threwError = true;
      }

      // Original code: does NOT throw (null is falsy, short-circuits before .env access)
      // Mutated code: DOES throw (tries to access null.env => TypeError)
      expect(threwError).toBe(false);
    } finally {
      global.process = originalProcess;
      delete require.cache[qPath];
      require("../../../../../../../../../../../../../subject_repositories/q/q.js");
    }
  });
});