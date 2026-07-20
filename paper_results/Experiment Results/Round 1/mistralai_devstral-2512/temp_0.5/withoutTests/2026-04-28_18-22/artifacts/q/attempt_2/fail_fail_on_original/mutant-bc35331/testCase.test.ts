// Test to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library Node.js environment detection", () => {
  it("should correctly identify Node.js environment and use process.nextTick", (done) => {
    // This test verifies that Q correctly detects Node.js environment
    // The mutation changes the condition from checking if process.toString() === "[object process]"
    // to checking if process.toString() === "", which would fail to detect Node.js properly

    // Create a deferred object
    const deferred = Q.defer();

    // Track if process.nextTick was used by checking the timing
    let nextTickUsed = false;
    const originalNextTick = process.nextTick;
    process.nextTick = function(callback) {
      nextTickUsed = true;
      originalNextTick.call(process, callback);
    };

    // Resolve the deferred
    deferred.resolve("test");

    // Give some time for the nextTick to be called
    setTimeout(() => {
      // Restore original nextTick
      process.nextTick = originalNextTick;

      // In the original code, nextTick should be used in Node.js environment
      // In the mutated code, it won't detect Node.js properly and won't use nextTick
      expect(nextTickUsed).toBe(true);
      done();
    }, 10);
  });
});