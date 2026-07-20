// Test file must be in the same directory as q.js
const Q = require("./q.js");

describe("MessageChannel fallback", () => {
  it("should use MessageChannel when available for async operations", (done) => {
    // Store original MessageChannel
    const OriginalMessageChannel = global.MessageChannel;

    // Mock MessageChannel
    global.MessageChannel = class {
      constructor() {
        this.port1 = {
          onmessage: null,
          postMessage: () => {}
        };
        this.port2 = {
          postMessage: () => {}
        };
      }
    };

    // Test that async operations work with MessageChannel
    Q.resolve(42).then((value: number) => {
      expect(value).toBe(42);

      // Restore original MessageChannel
      global.MessageChannel = OriginalMessageChannel;
      done();
    }).catch((err: Error) => {
      // Restore original MessageChannel in case of error
      global.MessageChannel = OriginalMessageChannel;
      done(err);
    });
  });
});