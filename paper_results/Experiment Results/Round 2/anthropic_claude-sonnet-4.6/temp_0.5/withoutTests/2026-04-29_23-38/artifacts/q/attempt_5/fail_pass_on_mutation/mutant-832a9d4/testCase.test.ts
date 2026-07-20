describe("Q MessageChannel branch", () => {
  it("should resolve promises when MessageChannel is available and setImmediate is not", async () => {
    const originalSetImmediate = (global as any).setImmediate;
    const originalMessageChannel = (global as any).MessageChannel;

    // Create a working MessageChannel mock
    class MockPort {
      onmessage: ((e: any) => void) | null = null;
      _other: MockPort | null = null;
      postMessage(data: any) {
        const other = this._other;
        if (other && other.onmessage) {
          // Use real setTimeout to deliver the message asynchronously
          originalSetImmediate(() => other.onmessage!({ data }));
        }
      }
    }
    class MockMessageChannel {
      port1 = new MockPort();
      port2 = new MockPort();
      constructor() {
        this.port1._other = this.port2;
        this.port2._other = this.port1;
      }
    }

    (global as any).MessageChannel = MockMessageChannel;
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
    } catch (e) {
      error = e;
    }

    expect(error).toBeNull();
    expect(value).toBe(42);
  });
});