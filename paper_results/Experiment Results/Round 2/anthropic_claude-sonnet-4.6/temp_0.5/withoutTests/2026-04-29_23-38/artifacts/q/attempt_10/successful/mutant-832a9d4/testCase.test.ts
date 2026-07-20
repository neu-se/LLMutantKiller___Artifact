describe("Q MessageChannel branch", () => {
  it("should initialize requestTick via MessageChannel when process.nextTick and setImmediate are absent", () => {
    const originalSetImmediate = (global as any).setImmediate;
    const originalMessageChannel = (global as any).MessageChannel;
    const originalProcessNextTick = process.nextTick;

    let postMessageCalled = false;
    const port1: any = { onmessage: null };
    const port2: any = {
      postMessage: (_: any) => { postMessageCalled = true; }
    };

    (global as any).MessageChannel = function() {
      return { port1, port2 };
    };

    Object.defineProperty(global, 'setImmediate', {
      value: undefined,
      configurable: true,
      writable: true
    });

    // Remove process.nextTick to prevent the Node.js branch from being taken
    (process as any).nextTick = undefined;

    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];
    const QReloaded = require(modulePath);

    // Restore
    (process as any).nextTick = originalProcessNextTick;
    Object.defineProperty(global, 'setImmediate', {
      value: originalSetImmediate,
      configurable: true,
      writable: true
    });
    (global as any).MessageChannel = originalMessageChannel;

    // Trigger nextTick - original calls requestTick which calls postMessage
    // Mutated: requestTick is undefined, throws TypeError
    QReloaded.nextTick(() => {});

    expect(postMessageCalled).toBe(true);
  });
});