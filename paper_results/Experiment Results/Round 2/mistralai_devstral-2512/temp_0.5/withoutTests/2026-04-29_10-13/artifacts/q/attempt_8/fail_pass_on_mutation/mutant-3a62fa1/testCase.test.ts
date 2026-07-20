const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q library environment detection", () => {
  it("should correctly identify Node.js environment for process.nextTick usage", (done) => {
    // This test targets the mutation that changes:
    // "typeof process === 'object'" to "true"
    // which would cause Q to always assume Node.js environment

    // We'll test by checking if Q.nextTick properly handles the environment
    // In original code: should use appropriate fallback when not in Node.js
    // In mutated code: would always try to use process.nextTick

    // Create a promise that will use nextTick
    const testPromise = Q.resolve("test");

    // Track if process.nextTick was called
    let nextTickCalled = false;
    const originalNextTick = process.nextTick;
    process.nextTick = function(callback: Function) {
      nextTickCalled = true;
      return originalNextTick.call(process, callback);
    };

    testPromise.then((value: string) => {
      expect(value).toBe("test");

      // In Node.js environment, nextTick should be called
      if (typeof process === 'object' && typeof process.nextTick === 'function') {
        expect(nextTickCalled).toBe(true);
      }

      // Restore original nextTick
      process.nextTick = originalNextTick;
      done();
    }).catch((error: Error) => {
      // Restore original nextTick before failing
      process.nextTick = originalNextTick;
      done(error);
    });
  });
});