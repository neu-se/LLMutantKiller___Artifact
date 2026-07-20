const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library Node.js environment detection", () => {
  it("should use correct tick mechanism based on environment detection", () => {
    // The mutation changes Node.js detection from checking process.toString()
    // to always true. We can detect this by checking if Q.nextTick uses
    // process.nextTick when it shouldn't (in a simulated non-Node environment)

    const originalToString = process.toString;
    const originalNextTick = process.nextTick;

    try {
      // Simulate a browser environment where process exists but isn't Node.js
      process.toString = () => "[object Object]";

      // Track if process.nextTick is called
      let nextTickCalled = false;
      process.nextTick = function(callback) {
        nextTickCalled = true;
        return originalNextTick.call(this, callback);
      };

      // Force Q to initialize its nextTick mechanism
      const deferred = Q.defer();
      deferred.resolve("test");

      // In original code, nextTickCalled should remain false in non-Node environment
      // In mutated code, nextTickCalled will be true because it always tries process.nextTick
      expect(nextTickCalled).toBe(false);

    } finally {
      // Restore originals
      process.toString = originalToString;
      process.nextTick = originalNextTick;
    }
  });
});