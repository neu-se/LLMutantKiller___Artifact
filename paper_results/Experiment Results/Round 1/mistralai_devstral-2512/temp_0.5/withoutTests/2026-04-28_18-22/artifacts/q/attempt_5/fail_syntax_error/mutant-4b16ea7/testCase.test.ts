// Test to detect the mutation in q.js where `if (typeof window !== "undefined")` was changed to `if (false)`
const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library setImmediate fallback", () => {
  it("should use setImmediate when available in browser-like environment", (done) => {
    // Create a mock browser-like environment with setImmediate
    const originalWindow = global.window;
    const originalSetImmediate = global.setImmediate;
    const originalSetTimeout = global.setTimeout;

    // Track which mechanism was used
    let mechanismUsed: string | null = null;

    // Mock setImmediate to track its usage
    global.setImmediate = (fn: Function) => {
      mechanismUsed = "setImmediate";
      return originalSetImmediate.call(global, fn);
    } as any;

    // Mock setTimeout to track its usage
    global.setTimeout = (fn: Function, delay?: number) => {
      mechanismUsed = "setTimeout";
      return originalSetTimeout.call(global, fn, delay);
    } as any;

    // Mock a browser-like environment
    global.window = {
      setImmediate: global.setImmediate
    } as any;

    try {
      // Create a promise and check which mechanism was used
      q.resolve().then(() => {
        // In the original code, setImmediate should be used when window is defined
        // In the mutated code, it will fall back to setTimeout
        if (mechanismUsed === "setImmediate") {
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
          done(new Error(`Expected setImmediate but got ${mechanismUsed}`));
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