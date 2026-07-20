import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library environment detection", () => {
  it("should correctly detect browser environment with MessageChannel", (done) => {
    // Save original global objects
    const originalWindow = global.window;
    const originalProcess = global.process;
    const originalSetImmediate = global.setImmediate;
    const originalMessageChannel = global.MessageChannel;

    // Setup test environment to simulate a browser with MessageChannel
    delete global.window;
    delete global.process;
    delete global.setImmediate;
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
      // Create a deferred and verify it works in this environment
      const deferred = Q.defer();
      let testPassed = false;

      deferred.promise.then(() => {
        testPassed = true;
      });

      // Resolve after a tick to ensure async path is tested
      setTimeout(() => {
        deferred.resolve("success");
        setTimeout(() => {
          expect(testPassed).toBe(true);
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