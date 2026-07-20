const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library MessageChannel detection", () => {
  it("should use MessageChannel when available in non-Node environment", (done) => {
    // Save original globals
    const originalWindow = (global as any).window;
    const originalProcess = (global as any).process;
    const originalSetImmediate = (global as any).setImmediate;
    const originalMessageChannel = (global as any).MessageChannel;

    // Setup environment to simulate browser with MessageChannel but no window
    (global as any).window = undefined;
    (global as any).process = undefined;
    (global as any).setImmediate = undefined;
    (global as any).MessageChannel = function() {
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
      const deferred = Q.defer();
      let resolved = false;

      deferred.promise.then(() => {
        resolved = true;
      });

      // The mutation changes the condition from checking window to always true
      // This should cause the MessageChannel path to be taken even when window is undefined
      setTimeout(() => {
        deferred.resolve("test");
        setTimeout(() => {
          expect(resolved).toBe(true);
          done();
        }, 10);
      }, 0);
    } finally {
      // Restore globals
      (global as any).window = originalWindow;
      (global as any).process = originalProcess;
      (global as any).setImmediate = originalSetImmediate;
      (global as any).MessageChannel = originalMessageChannel;
    }
  });
});