describe("Q MessageChannel requestTick initialization", () => {
  it("should initialize requestTick using MessageChannel when available and call port2.postMessage", async () => {
    let postMessageCallCount = 0;
    let onmessageHandler: Function | null = null;

    const mockPort1 = {
      set onmessage(fn: Function) { onmessageHandler = fn; },
      get onmessage() { return onmessageHandler; }
    };
    const mockPort2 = {
      postMessage: (_msg: any) => { postMessageCallCount++; }
    };

    (global as any).MessageChannel = function() {
      return { port1: mockPort1, port2: mockPort2 };
    };

    jest.resetModules();

    let Q: any;
    try {
      Q = (await import("../../../../../../../../../../../subject_repositories/q/q.js")).default;
    } finally {
      delete (global as any).MessageChannel;
    }

    // In original code: requestTick calls setTimeout(flush, 0) AND port2.postMessage(0)
    // In mutated code: requestTick is undefined (void 0), throws TypeError
    expect(() => Q.nextTick(() => {})).not.toThrow();
    expect(postMessageCallCount).toBeGreaterThan(0);
  });
});