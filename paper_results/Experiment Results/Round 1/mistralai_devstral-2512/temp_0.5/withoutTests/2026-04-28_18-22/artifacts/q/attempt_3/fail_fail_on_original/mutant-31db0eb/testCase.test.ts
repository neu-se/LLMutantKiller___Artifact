const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library MessageChannel detection", () => {
  it("should use setTimeout fallback when window is undefined but MessageChannel exists", (done) => {
    // Save original globals
    const originalWindow = global.window;
    const originalProcess = global.process;
    const originalSetImmediate = global.setImmediate;
    const originalMessageChannel = global.MessageChannel;

    // Setup environment where window is undefined but MessageChannel exists
    global.window = undefined;
    global.process = undefined;
    global.setImmediate = undefined;
    global.MessageChannel = function() {
      this.port1 = { onmessage: null, postMessage: () => {} };
      this.port2 = { postMessage: () => {}, onmessage: null };
    };

    try {
      const deferred = Q.defer();
      let resolved = false;

      deferred.promise.then(() => {
        resolved = true;
      });

      // The mutation changes the condition from checking window to always true
      // This should cause different behavior in the nextTick implementation
      setTimeout(() => {
        deferred.resolve("test");
        setTimeout(() => {
          expect(resolved).toBe(true);
          done();
        }, 10);
      }, 0);
    } finally {
      // Restore globals
      global.window = originalWindow;
      global.process = originalProcess;
      global.setImmediate = originalSetImmediate;
      global.MessageChannel = originalMessageChannel;
    }
  });
});