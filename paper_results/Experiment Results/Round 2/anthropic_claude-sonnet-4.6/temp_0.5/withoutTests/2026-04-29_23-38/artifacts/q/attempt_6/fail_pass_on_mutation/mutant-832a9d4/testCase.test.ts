describe("Q MessageChannel branch", () => {
  it("requestTick is defined when MessageChannel is available and setImmediate is not", () => {
    const originalSetImmediate = (global as any).setImmediate;
    const originalMessageChannel = (global as any).MessageChannel;

    class MockMessageChannel {
      port1: any = { onmessage: null };
      port2: any = { postMessage: (_: any) => {} };
    }

    (global as any).MessageChannel = MockMessageChannel;
    delete (global as any).setImmediate;

    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];
    const QReloaded = require(modulePath);

    (global as any).setImmediate = originalSetImmediate;
    (global as any).MessageChannel = originalMessageChannel;

    // Calling nextTick should not throw - requestTick must be defined
    // With mutation: requestTick is undefined → throws TypeError
    // With original: requestTick is set → no throw
    expect(() => {
      QReloaded.nextTick(() => {});
    }).not.toThrow();
  });
});