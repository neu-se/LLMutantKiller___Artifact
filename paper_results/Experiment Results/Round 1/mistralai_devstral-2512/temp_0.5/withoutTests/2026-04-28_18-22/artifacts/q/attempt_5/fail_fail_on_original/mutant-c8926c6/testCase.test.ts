const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library Node.js environment detection", () => {
  it("should use process.nextTick only in real Node.js environment", (done) => {
    // The mutation changes the condition from checking process.toString()
    // to always true, which means it will try to use process.nextTick
    // even in non-Node environments where it shouldn't

    // We'll test this by temporarily modifying process.toString to simulate
    // a non-Node environment and see if Q still tries to use process.nextTick

    const originalToString = process.toString;
    const originalNextTick = process.nextTick;

    try {
      // Simulate a browser-like environment where process exists but isn't Node.js
      process.toString = function() {
        return "[object Object]";
      };

      let nextTickUsed = false;
      process.nextTick = function(callback) {
        nextTickUsed = true;
        return originalNextTick.call(this, callback);
      };

      // Create a promise that will trigger nextTick usage
      const deferred = Q.defer();
      deferred.resolve("test");

      deferred.promise.then(() => {
        // In original code, nextTickUsed should be false in non-Node environment
        // In mutated code, nextTickUsed will be true because it always tries process.nextTick
        expect(nextTickUsed).toBe(false);
        done();
      });

    } finally {
      // Restore originals
      process.toString = originalToString;
      process.nextTick = originalNextTick;
    }
  });
});