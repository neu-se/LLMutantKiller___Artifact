import { Q } from "./q";

describe("Q library MessageChannel detection", () => {
  it("should use MessageChannel when available in non-Node environments", (done) => {
    // Save original global objects
    const originalWindow = global.window;
    const originalProcess = global.process;
    const originalSetImmediate = global.setImmediate;
    const originalMessageChannel = global.MessageChannel;

    // Setup test environment to simulate a browser with MessageChannel
    global.window = undefined;
    global.process = undefined;
    global.setImmediate = undefined;
    global.MessageChannel = function() {
      this.port1 = {
        onmessage: null,
        postMessage: () => {}
      };
      this.port2 = {
        postMessage: () => {},
        onmessage: null
      };
    };

    try {
      // Create a promise and verify it uses MessageChannel path
      const deferred = Q.defer();
      let resolved = false;

      deferred.promise.then(() => {
        resolved = true;
      });

      // Resolve after a tick to ensure async path is tested
      setTimeout(() => {
        deferred.resolve("test");
        setTimeout(() => {
          // In the original code, this should work fine
          // In the mutated code, it might behave differently
          expect(resolved).toBe(true);
          done();
        }, 10);
      }, 0);
    } finally {
      // Restore original globals
      global.window = originalWindow;
      global.process = originalProcess;
      global.setImmediate = originalSetImmediate;
      global.MessageChannel = originalMessageChannel;
    }
  });
});