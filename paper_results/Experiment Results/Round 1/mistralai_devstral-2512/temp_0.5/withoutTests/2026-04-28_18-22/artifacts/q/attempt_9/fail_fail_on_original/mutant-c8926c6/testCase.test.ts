const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library Node.js environment detection", () => {
  it("should use process.nextTick only when process.toString() returns '[object process]'", () => {
    // The mutation changes the Node.js detection condition from:
    // process.toString() === "[object process]" && process.nextTick
    // to:
    // true && process.nextTick
    //
    // We can detect this by checking if Q.nextTick uses process.nextTick
    // when process.toString() returns something other than "[object process]"

    const originalToString = process.toString;
    const originalNextTick = process.nextTick;

    try {
      // Simulate a non-Node environment (like Browserify)
      process.toString = () => "[object Object]";

      // Track if process.nextTick is actually used
      let nextTickUsed = false;
      process.nextTick = function(callback) {
        nextTickUsed = true;
        return originalNextTick.call(this, callback);
      };

      // Create a deferred to trigger nextTick usage
      const deferred = Q.defer();
      deferred.resolve("test");

      // Force a tick to complete the promise
      Q.nextTick(() => {
        // In original code, nextTickUsed should be false because
        // process.toString() !== "[object process]"
        // In mutated code, nextTickUsed will be true because it always uses process.nextTick
        expect(nextTickUsed).toBe(false);
      });

    } finally {
      // Restore originals
      process.toString = originalToString;
      process.nextTick = originalNextTick;
    }
  });
});