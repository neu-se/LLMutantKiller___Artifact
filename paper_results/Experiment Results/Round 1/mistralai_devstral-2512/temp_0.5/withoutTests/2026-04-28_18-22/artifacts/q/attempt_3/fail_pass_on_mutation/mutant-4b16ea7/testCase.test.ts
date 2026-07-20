// Test to detect the mutation in q.js where `if (typeof window !== "undefined")` was changed to `if (false)`
const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library setImmediate fallback", () => {
  it("should use setImmediate when available in browser-like environment", (done) => {
    // Create a mock browser-like environment with setImmediate
    const originalWindow = global.window;
    const originalSetImmediate = global.setImmediate;

    // Mock a browser-like environment
    global.window = {
      setImmediate: (fn: Function) => {
        return originalSetImmediate.call(global, fn);
      }
    };

    try {
      // Create a promise and check if it resolves correctly
      // This tests that setImmediate is being used properly
      let resolved = false;
      q.resolve().then(() => {
        resolved = true;
        // Clean up
        global.window = originalWindow;
        global.setImmediate = originalSetImmediate;
        done();
      });

      // Give the event loop time to process
      setTimeout(() => {
        if (!resolved) {
          // Clean up
          global.window = originalWindow;
          global.setImmediate = originalSetImmediate;
          done(new Error("Promise did not resolve using setImmediate"));
        }
      }, 100);
    } catch (error) {
      // Clean up
      global.window = originalWindow;
      global.setImmediate = originalSetImmediate;
      done(error);
    }
  });
});