const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q async scheduling behavior", () => {
  it("should use setImmediate when available for promise resolution", (done) => {
    // Save original setImmediate
    const originalSetImmediate = global.setImmediate;
    let setImmediateCalled = false;

    // Mock setImmediate to track calls
    global.setImmediate = function(callback: (...args: any[]) => void): any {
      setImmediateCalled = true;
      // Call the original setImmediate to maintain actual async behavior
      return originalSetImmediate(() => {
        callback();
      });
    };

    try {
      // Create a promise that will trigger async scheduling
      const promise = Q.resolve();

      // Add a then handler
      promise.then(() => {
        // Verify setImmediate was used
        expect(setImmediateCalled).toBe(true);
        done();
      });

      // Give the promise time to schedule its callback
      setTimeout(() => {
        // If we get here without the expect being called, the test failed
        if (!setImmediateCalled) {
          done(new Error("setImmediate was not called"));
        }
      }, 50);
    } finally {
      // Restore original setImmediate
      global.setImmediate = originalSetImmediate;
    }
  });
});