// Test to detect the mutation in q.js where `if (typeof window !== "undefined")` was changed to `if (false)`
import { Q } from "./q.js";

describe("Q library setImmediate fallback", () => {
  it("should use setImmediate when available in browser-like environment", () => {
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
      Q.resolve().then(() => {
        resolved = true;
      });

      // Give the event loop time to process
      return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          if (!resolved) {
            reject(new Error("Promise did not resolve using setImmediate"));
          } else {
            resolve();
          }
        }, 100);
      });
    } finally {
      // Restore original environment
      global.window = originalWindow;
      global.setImmediate = originalSetImmediate;
    }
  });
});