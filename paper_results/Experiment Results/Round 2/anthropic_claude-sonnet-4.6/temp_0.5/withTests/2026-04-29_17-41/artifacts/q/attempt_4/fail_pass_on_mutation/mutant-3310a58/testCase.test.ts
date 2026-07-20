describe("Q longStackSupport initialization", () => {
  it("should not enable longStackSupport when process is not an object type even if process.env.Q_DEBUG is set", () => {
    const originalProcess = global.process;
    const qPath = require.resolve("../../../../../../../../../../../../../subject_repositories/q/q.js");

    try {
      // Make process a function (typeof === "function", not "object")
      // but still has .env.Q_DEBUG set
      const fakeProcess: any = function () {};
      fakeProcess.env = { Q_DEBUG: "1" };
      fakeProcess.nextTick = originalProcess.nextTick.bind(originalProcess);
      fakeProcess.toString = () => "[object process]";
      fakeProcess.domain = null;

      (global as any).process = fakeProcess;

      delete require.cache[qPath];
      const Q = require("../../../../../../../../../../../../../subject_repositories/q/q.js");

      // Original: typeof process === "object" is false for a function, so longStackSupport stays false
      // Mutated: true && process.env && process.env.Q_DEBUG is truthy, so longStackSupport becomes true
      expect(Q.longStackSupport).toBe(false);
    } finally {
      global.process = originalProcess;
      delete require.cache[qPath];
      require("../../../../../../../../../../../../../subject_repositories/q/q.js");
    }
  });
});