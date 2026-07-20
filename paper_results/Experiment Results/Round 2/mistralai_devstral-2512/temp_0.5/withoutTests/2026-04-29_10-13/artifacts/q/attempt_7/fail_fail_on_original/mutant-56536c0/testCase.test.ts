const Q = require("./q.js");

describe("MessageChannel detection", () => {
  it("should properly detect MessageChannel availability", (done) => {
    // Store original MessageChannel
    const OriginalMessageChannel = (global as any).MessageChannel;

    // Mock MessageChannel to verify detection
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

    // Test async operation that should use MessageChannel
    let testValue = 42;
    Q.resolve(testValue).then((value: number) => {
      expect(value).toBe(testValue);
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