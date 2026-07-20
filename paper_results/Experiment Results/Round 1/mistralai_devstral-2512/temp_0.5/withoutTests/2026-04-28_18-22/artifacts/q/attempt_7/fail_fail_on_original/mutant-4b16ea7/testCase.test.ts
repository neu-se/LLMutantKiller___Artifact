// Test to detect the mutation in q.js where `if (typeof window !== "undefined")` was changed to `if (false)`
const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library setImmediate fallback", () => {
  it("should use setImmediate when available in browser-like environment", (done) => {
    // Store original values
    const originalWindow = global.window;
    const originalSetImmediate = global.setImmediate;
    const originalSetTimeout = global.setTimeout;

    // Create a flag to track which mechanism was used
    let setImmediateUsed = false;
    let setTimeoutUsed = false;

    // Override setImmediate to track usage
    global.setImmediate = function(fn: (...args: any[]) => void): any {
      setImmediateUsed = true;
      return originalSetImmediate(fn);
    };

    // Override setTimeout to track usage
    global.setTimeout = function(fn: (...args: any[]) => void, delay?: number): any {
      setTimeoutUsed = true;
      return originalSetTimeout(fn, delay);
    };

    // Create a mock window object
    global.window = {} as any;

    try {
      // Create a promise and check which mechanism was used
      q.resolve().then(() => {
        // In the original code, when window is defined, it should use setImmediate
        // In the mutated code, it will skip the window check and fall back to setTimeout
        if (setImmediateUsed && !setTimeoutUsed) {
          // Clean up
          global.window = originalWindow;
          global.setImmediate = originalSetImmediate;
          global.setTimeout = originalSetTimeout;
          done();
        } else {
          // Clean up
          global.window = originalWindow;
          global.setImmediate = originalSetImmediate;
          global.setTimeout = originalSetTimeout;
          done(new Error("Expected setImmediate to be used when window is defined"));
        }
      });

      // Safety timeout
      setTimeout(() => {
        // Clean up
        global.window = originalWindow;
        global.setImmediate = originalSetImmediate;
        global.setTimeout = originalSetTimeout;
        done(new Error("Test timed out"));
      }, 200);
    } catch (error) {
      // Clean up
      global.window = originalWindow;
      global.setImmediate = originalSetImmediate;
      global.setTimeout = originalSetTimeout;
      done(error);
    }
  });
});