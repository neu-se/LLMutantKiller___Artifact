const Q = require("./q.js");

describe("MessageChannel scheduling", () => {
  it("should use MessageChannel when available", (done) => {
    // Store original MessageChannel
    const OriginalMessageChannel = (global as any).MessageChannel;

    // Mock MessageChannel to verify it's being used
    let messageChannelUsed = false;
    (global as any).MessageChannel = class {
      constructor() {
        messageChannelUsed = true;
        this.port1 = {
          onmessage: null,
          postMessage: () => {}
        };
        this.port2 = {
          postMessage: () => {}
        };
      }
    };

    // Test that async operations complete successfully
    let promiseResolved = false;
    Q.resolve(42).then((value: number) => {
      promiseResolved = true;
      expect(value).toBe(42);
      expect(promiseResolved).toBe(true);
      expect(messageChannelUsed).toBe(true);

      // Restore original MessageChannel
      (global as any).MessageChannel = OriginalMessageChannel;
      done();
    }).catch((err: Error) => {
      // Restore original MessageChannel in case of error
      (global as any).MessageChannel = OriginalMessageChannel;
      done(err);
    });
  });
});