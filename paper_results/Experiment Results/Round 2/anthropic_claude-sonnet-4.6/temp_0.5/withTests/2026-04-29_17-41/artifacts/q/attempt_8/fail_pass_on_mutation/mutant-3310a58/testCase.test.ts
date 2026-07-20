describe("Q longStackSupport with non-object process", () => {
  it("should not set longStackSupport when process is a function type with Q_DEBUG set", () => {
    const qPath = require.resolve("../../../../../../../../../../../../../subject_repositories/q/q.js");
    const originalProcess = global.process;

    // Clear cache BEFORE changing process
    delete require.cache[qPath];

    const fakeProcess: any = function fakeProc() {};
    fakeProcess.env = { Q_DEBUG: "1" };
    fakeProcess.nextTick = originalProcess.nextTick.bind(originalProcess);
    fakeProcess.toString = () => "[object process]";
    fakeProcess.domain = undefined;
    fakeProcess.emit = originalProcess.emit ? originalProcess.emit.bind(originalProcess) : undefined;

    (global as any).process = fakeProcess;

    let Q: any;
    try {
      Q = require("../../../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      global.process = originalProcess;
      delete require.cache[qPath];
      require("../../../../../../../../../../../../../subject_repositories/q/q.js");
    }

    // Original: typeof fakeProcess === "function" !== "object" → condition false → longStackSupport stays false
    // Mutated: true && fakeProcess.env && fakeProcess.env.Q_DEBUG → condition true → longStackSupport = true
    expect(Q.longStackSupport).toBe(false);
  });
});