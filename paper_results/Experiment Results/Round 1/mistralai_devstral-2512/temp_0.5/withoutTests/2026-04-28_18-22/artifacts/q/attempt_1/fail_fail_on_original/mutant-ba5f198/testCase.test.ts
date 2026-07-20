import { Q } from "./q";

describe("Q library setImmediate detection", () => {
  it("should use setImmediate when available for async scheduling", (done) => {
    // This test verifies that Q uses setImmediate when it's available
    // The mutation changes the condition from `typeof setImmediate === "function"`
    // to `typeof setImmediate !== "function"`, which would break this behavior

    // Save original setImmediate
    const originalSetImmediate = global.setImmediate;

    // Create a mock setImmediate to track if it's being used
    let setImmediateCalled = false;
    global.setImmediate = function(callback: (...args: any[]) => void, ...args: any[]): any {
      setImmediateCalled = true;
      return originalSetImmediate.call(global, callback, ...args);
    };

    try {
      // Force re-evaluation of the async mechanism
      delete require.cache[require.resolve("./q")];
      const Q = require("./q");

      // Create and resolve a promise to trigger async scheduling
      Q.resolve().then(() => {
        // Give some time for the async operation to complete
        setTimeout(() => {
          expect(setImmediateCalled).toBe(true);
          done();
        }, 10);
      });
    } finally {
      // Restore original setImmediate
      global.setImmediate = originalSetImmediate;
    }
  });
});