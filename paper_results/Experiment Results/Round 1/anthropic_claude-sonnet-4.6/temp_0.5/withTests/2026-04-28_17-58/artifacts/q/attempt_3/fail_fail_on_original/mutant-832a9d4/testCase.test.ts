describe("Q MessageChannel requestTick branch", () => {
  it("should correctly initialize requestTick using MessageChannel when setImmediate is not available", () => {
    const originalSetImmediate = (global as any).setImmediate;
    const originalMessageChannel = (global as any).MessageChannel;

    let port2PostMessageCalled = false;

    // Remove setImmediate to trigger the MessageChannel branch
    delete (global as any).setImmediate;

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
    }

    // On original code, requestTick is set up properly via MessageChannel
    // so port2.postMessage gets called when nextTick is invoked.
    // On mutated code, requestTick is undefined and calling nextTick will throw.
    expect(() => {
      Q.nextTick(() => {});
    }).not.toThrow();

    expect(port2PostMessageCalled).toBe(true);
  });
});