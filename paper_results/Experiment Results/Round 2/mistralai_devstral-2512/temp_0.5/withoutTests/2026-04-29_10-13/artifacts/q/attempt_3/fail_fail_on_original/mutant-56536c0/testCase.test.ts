// Test file must be in the same directory as q.js
const Q = require("./q.js");

describe("MessageChannel scheduling", () => {
  it("should properly schedule async tasks when MessageChannel is available", (done) => {
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
    Q.resolve(42).then((value: number) => {
      expect(value).toBe(42);
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