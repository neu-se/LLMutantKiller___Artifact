describe("Q MessageChannel requestTick", () => {
  it("should call port2.postMessage when MessageChannel is available and setImmediate is absent", () => {
    const originalSetImmediate = (global as any).setImmediate;
    delete (global as any).setImmediate;

    let port2PostMessageCount = 0;
    let port1OnMessage: any = null;

    const port1 = {};
    Object.defineProperty(port1, "onmessage", {
      set: (fn: any) => { port1OnMessage = fn; },
      get: () => port1OnMessage,
      configurable: true
    });

    const mockChannel = {
      port1,
      port2: { postMessage: (_: any) => { port2PostMessageCount++; } }
    };
    (global as any).MessageChannel = function() { return mockChannel; };

    let Q: any;
    jest.isolateModules(() => {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    });

    (global as any).setImmediate = originalSetImmediate;
    delete (global as any).MessageChannel;

    // Original: requestTick calls setTimeout + port2.postMessage(0)
    // Mutated: requestTick is undefined, throws TypeError
    expect(() => Q.nextTick(() => {})).not.toThrow();
    expect(port2PostMessageCount).toBeGreaterThan(0);
  });
});