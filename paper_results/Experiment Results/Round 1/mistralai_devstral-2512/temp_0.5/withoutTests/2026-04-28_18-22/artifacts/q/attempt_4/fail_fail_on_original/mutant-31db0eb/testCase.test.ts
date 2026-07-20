const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library environment detection", () => {
  it("should correctly handle MessageChannel availability in browser-like environment", (done) => {
    // Save original globals
    const originalWindow = (global as any).window;
    const originalProcess = (global as any).process;
    const originalSetImmediate = (global as any).setImmediate;
    const originalMessageChannel = (global as any).MessageChannel;

    // Setup environment to simulate browser with MessageChannel
    (global as any).window = { };
    (global as any).process = undefined;
    (global as any).setImmediate = undefined;
    (global as any).MessageChannel = function() {
      this.port1 = { onmessage: null, postMessage: () => {} };
      this.port2 = { postMessage: () => {}, onmessage: null };
    };

    try {
      const deferred = Q.defer();
      let testValue = "";

      deferred.promise.then((value: string) => {
        testValue = value;
      });

      setTimeout(() => {
        deferred.resolve("success");
        setTimeout(() => {
          expect(testValue).toBe("success");
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