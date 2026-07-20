describe("Q MessageChannel branch", () => {
  it("should use MessageChannel for scheduling when available", (done) => {
    const originalSetImmediate = (global as any).setImmediate;
    const originalMessageChannel = (global as any).MessageChannel;

    let postMessageCalled = false;

    class MockMessageChannel {
      port1: any = { onmessage: null };
      port2: any = {
        postMessage: (_: any) => {
          postMessageCalled = true;
          // Deliver message to port1
          if (mockChannel.port1.onmessage) {
            mockChannel.port1.onmessage({});
          }
        }
      };
    }
    const mockChannel = new MockMessageChannel();
    const OrigMC = MockMessageChannel;
    
    (global as any).MessageChannel = function() { return mockChannel; };
    (global as any).setImmediate = undefined as any;
    delete (global as any).setImmediate;

    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];
    const QReloaded = require(modulePath);

    (global as any).setImmediate = originalSetImmediate;
    (global as any).MessageChannel = originalMessageChannel;

    QReloaded.nextTick(() => {
      // Original: postMessage was called as part of requestTick
      // Mutated: requestTick is undefined, so we never get here
      expect(postMessageCalled).toBe(true);
      done();
    });
  });
});