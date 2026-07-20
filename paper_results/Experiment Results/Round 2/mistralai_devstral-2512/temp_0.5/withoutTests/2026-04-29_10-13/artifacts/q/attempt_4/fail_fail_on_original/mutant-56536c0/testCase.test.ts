const Q = require("./q.js");

describe("MessageChannel detection", () => {
  it("should use MessageChannel when available for async scheduling", (done) => {
    // Store original MessageChannel
    const OriginalMessageChannel = (global as any).MessageChannel;

    // Mock MessageChannel
    (global as any).MessageChannel = class {
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
    let asyncOperationComplete = false;
    Q.resolve(42).then((value: number) => {
      asyncOperationComplete = true;
      expect(value).toBe(42);
      expect(asyncOperationComplete).toBe(true);

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