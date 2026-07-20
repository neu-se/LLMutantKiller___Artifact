const Q = require("./q.js");

describe("MessageChannel fallback behavior", () => {
  it("should use MessageChannel when available for async operations", (done) => {
    // Store original MessageChannel
    const OriginalMessageChannel = (global as any).MessageChannel;

    // Mock MessageChannel to track usage
    let messageChannelCreated = false;
    (global as any).MessageChannel = class {
      constructor() {
        messageChannelCreated = true;
        this.port1 = {
          onmessage: null,
          postMessage: () => {}
        };
        this.port2 = {
          postMessage: () => {}
        };
      }
    };

    // Test async operation
    Q.resolve(42).then((value: number) => {
      expect(value).toBe(42);
      expect(messageChannelCreated).toBe(true);

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