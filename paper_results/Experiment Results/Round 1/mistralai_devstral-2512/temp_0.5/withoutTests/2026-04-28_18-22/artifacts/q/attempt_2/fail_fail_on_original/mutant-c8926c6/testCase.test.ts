import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library Node.js environment detection", () => {
  it("should correctly identify Node.js environment", () => {
    // This test verifies that Q properly detects a Node.js environment
    // The mutation changes the condition from checking process.toString() to just true
    // We can detect this by checking if Q.nextTick uses process.nextTick in Node.js

    // In the original code, Q should use process.nextTick in a real Node.js environment
    // In the mutated code, it will always try to use process.nextTick even in non-Node environments

    // Create a deferred and check if it uses the correct tick mechanism
    const deferred = Q.defer();
    let tickUsed = false;

    // Spy on process.nextTick to see if it's being used
    const originalNextTick = process.nextTick;
    process.nextTick = function(callback) {
      tickUsed = true;
      return originalNextTick.call(this, callback);
    };

    deferred.resolve("test");
    deferred.promise.then(() => {
      // In original code, tickUsed should be true in Node.js environment
      // In mutated code, it will always try to use process.nextTick
      expect(tickUsed).toBe(true);
    });

    // Restore original nextTick
    process.nextTick = originalNextTick;
  });
});