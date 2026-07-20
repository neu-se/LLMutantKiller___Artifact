describe("Q setImmediate branch for requestTick", () => {
  it("should use setImmediate as requestTick when setImmediate exists but process is not real Node.js", (done) => {
    jest.resetModules();

    const originalProcess = global.process;

    (global as any).process = {
      toString: () => "[object Object]",
      env: {},
    };

    let Q: any;
    try {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      global.process = originalProcess;
    }

    let taskExecuted = false;

    expect(() => {
      Q.nextTick(() => {
        taskExecuted = true;
      });
    }).not.toThrow();

    setImmediate(() => {
      setImmediate(() => {
        expect(taskExecuted).toBe(true);
        done();
      });
    });
  });
});