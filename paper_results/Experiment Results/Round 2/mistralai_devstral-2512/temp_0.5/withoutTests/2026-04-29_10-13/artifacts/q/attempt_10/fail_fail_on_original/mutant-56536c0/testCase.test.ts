const Q = require("./q.js");

describe("MessageChannel fallback", () => {
  it("should use MessageChannel when available for async scheduling", (done) => {
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

    // Test async operation that should use MessageChannel
    let testValue = 42;
    Q.resolve(testValue).then((value: number) => {
      expect(value).toBe(testValue);
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