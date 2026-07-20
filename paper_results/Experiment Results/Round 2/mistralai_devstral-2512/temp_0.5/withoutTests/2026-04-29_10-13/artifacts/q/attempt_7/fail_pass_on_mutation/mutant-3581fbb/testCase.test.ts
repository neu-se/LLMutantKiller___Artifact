const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly filter Node.js internal frames from stack traces", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise that will be rejected with a stack trace containing Node.js frames
    const deferred = Q.defer();
    setImmediate(() => {
      try {
        // This will create a stack trace with Node.js internal frames
        JSON.parse("invalid json");
      } catch (e) {
        deferred.reject(e);
      }
    });

    return deferred.promise.catch((error: Error) => {
      // Check if stack trace contains Node.js internal frames
      const hasNodeFrames = error.stack?.includes("(node.js:") || error.stack?.includes("(module.js:");

      // Original code should filter out Node frames (hasNodeFrames should be false)
      // Mutated code should incorrectly keep Node frames (hasNodeFrames should be true)
      expect(hasNodeFrames).toBe(false);
    });
  }, 10000);
});