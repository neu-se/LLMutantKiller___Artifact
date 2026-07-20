describe("Q MessageChannel branch", () => {
  it("should initialize requestTick via MessageChannel when setImmediate is absent", () => {
    const originalSetImmediate = (global as any).setImmediate;
    const originalMessageChannel = (global as any).MessageChannel;

    let postMessageCalled = false;
    const port1: any = { onmessage: null };
    const port2: any = {
      postMessage: (_: any) => { postMessageCalled = true; }
    };

    (global as any).MessageChannel = function() {
      return { port1, port2 };
    };
    
    // Must delete setImmediate in a way that affects typeof check
    Object.defineProperty(global, 'setImmediate', {
      value: undefined,
      configurable: true,
      writable: true
    });

    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];
    const QReloaded = require(modulePath);

    // Restore
    Object.defineProperty(global, 'setImmediate', {
      value: originalSetImmediate,
      configurable: true,
      writable: true
    });
    (global as any).MessageChannel = originalMessageChannel;

    // Trigger nextTick - original calls requestTick which calls postMessage
    // Mutated: requestTick is undefined, throws
    QReloaded.nextTick(() => {});

    expect(postMessageCalled).toBe(true);
  });
});