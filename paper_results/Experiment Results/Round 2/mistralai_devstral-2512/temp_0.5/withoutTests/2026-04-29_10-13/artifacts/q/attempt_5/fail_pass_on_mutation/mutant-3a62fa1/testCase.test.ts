const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q library process detection", () => {
  it("should correctly detect Node.js environment for nextTick implementation", (done) => {
    // This test verifies that Q correctly identifies Node.js environment
    // The mutation changes the process detection from "typeof process === 'object'"
    // to just "true", which would incorrectly assume Node.js environment

    // We'll test by checking if the nextTick implementation uses process.nextTick
    // In original code, it should only use process.nextTick in actual Node.js environment
    // In mutated code, it would always try to use process.nextTick

    // Create a promise that will use nextTick
    const testPromise = Q.resolve("test");

    // Spy on process.nextTick if it exists
    const originalNextTick = process?.nextTick;
    let nextTickCalled = false;

    if (originalNextTick) {
      process.nextTick = function(callback: Function) {
        nextTickCalled = true;
        return originalNextTick(callback);
      };
    }

    testPromise.then((value: string) => {
      expect(value).toBe("test");

      // In original code, nextTickCalled should be true in Node.js environment
      // In mutated code, it would try to call process.nextTick even if it doesn't exist
      if (typeof process === 'object' && typeof process.nextTick === 'function') {
        expect(nextTickCalled).toBe(true);
      }

      // Restore original nextTick
      if (originalNextTick) {
        process.nextTick = originalNextTick;
      }

      done();
    }).catch((error: Error) => {
      // Restore original nextTick before failing
      if (originalNextTick) {
        process.nextTick = originalNextTick;
      }
      done(error);
    });
  });
});