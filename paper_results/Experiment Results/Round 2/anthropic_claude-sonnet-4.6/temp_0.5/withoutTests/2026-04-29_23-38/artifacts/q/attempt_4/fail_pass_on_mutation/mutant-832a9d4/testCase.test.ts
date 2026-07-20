describe("Q MessageChannel branch", () => {
  it("should resolve promises when MessageChannel is available and setImmediate is not", async () => {
    const originalSetImmediate = (global as any).setImmediate;
    const originalMessageChannel = (global as any).MessageChannel;

    // Mock MessageChannel globally
    (global as any).MessageChannel = MessageChannel || class MockMessageChannel {
      port1: any = { onmessage: null };
      port2: any = { postMessage: () => { if (this.port1.onmessage) this.port1.onmessage({}); } };
    };
    delete (global as any).setImmediate;

    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];
    const QReloaded = require(modulePath);

    (global as any).setImmediate = originalSetImmediate;
    (global as any).MessageChannel = originalMessageChannel;

    let error: any = null;
    let value: any = null;
    try {
      value = await new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error("timeout")), 3000);
        QReloaded(42).then(resolve, reject);
      });
    } catch(e) { error = e; }

    expect(error).toBeNull();
    expect(value).toBe(42);
  });
});