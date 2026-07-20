describe("Q MessageChannel requestTick branch", () => {
  it("should correctly initialize requestTick using MessageChannel when setImmediate is not available and not in Node.js", () => {
    const originalSetImmediate = (global as any).setImmediate;
    const originalMessageChannel = (global as any).MessageChannel;
    const originalProcess = (global as any).process;

    let port2PostMessageCalled = false;

    // Make process appear non-Node (so Q skips the process.nextTick branch)
    // by making process.toString() return something other than "[object process]"
    (global as any).process = {
      toString: () => "[object Object]",
      domain: undefined,
      env: {}
    };

    // Remove setImmediate to skip that branch
    delete (global as any).setImmediate;

    // Provide MessageChannel
    (global as any).MessageChannel = function (this: any) {
      this.port1 = { onmessage: null };
      this.port2 = {
        postMessage: () => { port2PostMessageCalled = true; }
      };
    };

    jest.resetModules();

    let Q: any;
    try {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      (global as any).setImmediate = originalSetImmediate;
      (global as any).MessageChannel = originalMessageChannel;
      (global as any).process = originalProcess;
    }

    // On original code: requestTick is set up via MessageChannel,
    // so nextTick works and port2.postMessage is called.
    // On mutated code: requestTick remains undefined, so nextTick throws.
    expect(() => {
      Q.nextTick(() => {});
    }).not.toThrow();

    expect(port2PostMessageCalled).toBe(true);
  });
});