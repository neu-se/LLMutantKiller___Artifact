describe("Q MessageChannel requestTick", () => {
  it("should not throw when nextTick is called after module loaded with MessageChannel available", async () => {
    const originalSetImmediate = (global as any).setImmediate;
    delete (global as any).setImmediate;

    let port2PostMessageCount = 0;
    const mockChannel = {
      port1: { onmessage: null as any },
      port2: { postMessage: () => { port2PostMessageCount++; } }
    };

    (global as any).MessageChannel = function() { return mockChannel; };

    jest.resetModules();
    jest.isolateModules(() => {});

    const Q = (await import("../../../../../../../../../../../subject_repositories/q/q.js?" + Date.now())).default;

    (global as any).setImmediate = originalSetImmediate;
    delete (global as any).MessageChannel;

    // Original: requestTick properly set, no throw
    // Mutated: requestTick is undefined, throws TypeError
    expect(() => Q.nextTick(() => {})).not.toThrow();
    expect(port2PostMessageCount).toBeGreaterThan(0);
  });
});