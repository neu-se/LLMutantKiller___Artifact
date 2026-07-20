// Test to detect the mutation in q.js where `if (typeof window !== "undefined")` was changed to `if (false)`
const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library setImmediate fallback", () => {
  it("should use setImmediate when available in browser-like environment", (done) => {
    // Store original values
    const originalWindow = global.window;
    const originalSetImmediate = global.setImmediate;
    const originalSetTimeout = global.setTimeout;

    // Create a flag to track which mechanism was used
    let mechanismUsed: string | null = null;

    // Override setImmediate to track usage
    global.setImmediate = function(fn: (...args: any[]) => void): any {
      mechanismUsed = "setImmediate";
      return originalSetImmediate(fn);
    };

    // Override setTimeout to track usage
    global.setTimeout = function(fn: (...args: any[]) => void, delay?: number): any {
      mechanismUsed = "setTimeout";
      return originalSetTimeout(fn, delay);
    };

    // Create a mock window object with setImmediate
    global.window = {
      setImmediate: global.setImmediate
    } as any;

    try {
      // Create a promise and check which mechanism was used
      q.resolve().then(() => {
        // In the original code, when window.setImmediate is available, it should use it
        // In the mutated code, it will skip the window check and fall back to setTimeout
        if (mechanismUsed === "setImmediate") {
          // Clean up
          global.window = originalWindow;
          global.setImmediate = originalSetImmediate;
          global.setTimeout = originalSetTimeout;
          done();
        } else if (mechanismUsed === "setTimeout") {
          // Clean up
          global.window = originalWindow;
          global.setImmediate = originalSetImmediate;
          global.setTimeout = originalSetTimeout;
          done(new Error("Expected setImmediate to be used when window.setImmediate is available"));
        } else {
          // Clean up
          global.window = originalWindow;
          global.setImmediate = originalSetImmediate;
          global.setTimeout = originalSetTimeout;
          done(new Error("No mechanism was used"));
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