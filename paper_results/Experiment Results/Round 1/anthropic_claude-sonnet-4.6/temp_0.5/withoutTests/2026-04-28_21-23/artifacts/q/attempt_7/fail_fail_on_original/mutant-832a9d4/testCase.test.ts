describe("Q MessageChannel requestTick", () => {
  it("should call port2.postMessage when MessageChannel is available and setImmediate is absent", () => {
    const originalSetImmediate = (global as any).setImmediate;
    delete (global as any).setImmediate;

    let port2PostMessageCount = 0;
    const mockChannel = {
      port1: { onmessage: null as any },
      port2: { postMessage: () => { port2PostMessageCount++; } }
    };
    (global as any).MessageChannel = function() { return mockChannel; };

    let Q: any;
    jest.isolateModules(() => {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    });

    (global as any).setImmediate = originalSetImmediate;
    delete (global as any).MessageChannel;

    expect(() => Q.nextTick(() => {})).not.toThrow();
    expect(port2PostMessageCount).toBeGreaterThan(0);
  });
});