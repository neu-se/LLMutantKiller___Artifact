describe("Q module initialization safety", () => {
  it("should not throw when process is null during module initialization", () => {
    const originalProcess = global.process;
    const qPath = require.resolve("../q.js");

    try {
      // Set process to null - typeof null === "object" is true,
      // so the original's `typeof process === "object"` check passes,
      // but `&& process` (falsy) short-circuits safely.
      // The mutation uses `true` instead, skipping the falsy check,
      // so it proceeds to `null.env` which throws a TypeError.
      (global as any).process = null;

      delete require.cache[qPath];

      let threwError = false;
      try {
        require("../q.js");
      } catch (e) {
        threwError = true;
      }

      // Original code: does NOT throw (null is falsy, short-circuits)
      // Mutated code: DOES throw (tries to access null.env)
      expect(threwError).toBe(false);
    } finally {
      global.process = originalProcess;
      delete require.cache[qPath];
      // Reload the module to restore normal state
      require("../q.js");
    }
  });
});