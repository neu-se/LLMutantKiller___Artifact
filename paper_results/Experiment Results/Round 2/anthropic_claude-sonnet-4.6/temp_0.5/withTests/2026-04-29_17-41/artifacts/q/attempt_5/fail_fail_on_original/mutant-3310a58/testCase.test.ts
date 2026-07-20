describe("Q longStackSupport initialization", () => {
  it("should enable longStackSupport when process is a real object with Q_DEBUG set", () => {
    const originalProcess = global.process;
    const originalQDebug = process.env.Q_DEBUG;
    const qPath = require.resolve("../../../../../../../../../../../../../subject_repositories/q/q.js");

    try {
      process.env.Q_DEBUG = "1";

      delete require.cache[qPath];
      const Q = require("../../../../../../../../../../../../../subject_repositories/q/q.js");

      // Both original and mutated should set longStackSupport = true here
      // Now test with a non-object process that has env.Q_DEBUG
      delete require.cache[qPath];

      const fakeProcess: any = function fakeProc() {};
      fakeProcess.env = { Q_DEBUG: "1" };
      fakeProcess.nextTick = originalProcess.nextTick.bind(originalProcess);
      fakeProcess.toString = () => "[object process]";
      fakeProcess.domain = undefined;
      fakeProcess.emit = originalProcess.emit.bind(originalProcess);

      (global as any).process = fakeProcess;

      delete require.cache[qPath];
      const Q2 = require("../../../../../../../../../../../../../subject_repositories/q/q.js");

      // Original: typeof fakeProcess === "function" !== "object", so longStackSupport stays false
      // Mutated: true && fakeProcess.env && fakeProcess.env.Q_DEBUG => sets longStackSupport = true
      expect(Q2.longStackSupport).toBe(false);
    } finally {
      global.process = originalProcess;
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