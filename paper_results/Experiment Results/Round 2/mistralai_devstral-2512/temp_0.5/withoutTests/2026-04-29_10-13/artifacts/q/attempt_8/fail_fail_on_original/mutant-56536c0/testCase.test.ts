const Q = require("./q.js");

describe("MessageChannel scheduling behavior", () => {
  it("should use MessageChannel when available for async operations", (done) => {
    // Store original MessageChannel
    const OriginalMessageChannel = (global as any).MessageChannel;

    // Mock MessageChannel to verify it's being used
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
    let testComplete = false;
    Q.resolve(42).then((value: number) => {
      testComplete = true;
      expect(value).toBe(42);
      expect(testComplete).toBe(true);
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