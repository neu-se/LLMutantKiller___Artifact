describe("Q MessageChannel requestTick initialization", () => {
  it("should initialize requestTick using MessageChannel when available and setImmediate is not defined", async () => {
    const originalSetImmediate = (global as any).setImmediate;
    const originalMessageChannel = (global as any).MessageChannel;

    let postMessageCallCount = 0;

    // Remove setImmediate so the code falls through to the MessageChannel branch
    delete (global as any).setImmediate;

    (global as any).MessageChannel = function() {
      return {
        port1: {
          set onmessage(fn: any) {},
          get onmessage() { return null; }
        },
        port2: {
          postMessage: (_msg: any) => { postMessageCallCount++; }
        }
      };
    };

    jest.resetModules();

    let Q: any;
    try {
      Q = (await import("../../../../../../../../../../../subject_repositories/q/q.js")).default;
    } finally {
      (global as any).setImmediate = originalSetImmediate;
      if (originalMessageChannel !== undefined) {
        (global as any).MessageChannel = originalMessageChannel;
      } else {
        delete (global as any).MessageChannel;
      }
    }

    // In original: requestTick calls setTimeout(flush, 0) AND port2.postMessage(0)
    // In mutated: requestTick is undefined, throws TypeError
    expect(() => Q.nextTick(() => {})).not.toThrow();
    expect(postMessageCallCount).toBeGreaterThan(0);
  });
});