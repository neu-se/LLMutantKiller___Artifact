// Test to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library Node.js environment detection", () => {
  it("should correctly identify Node.js environment and use process.nextTick", () => {
    // This test verifies that Q correctly detects Node.js environment
    // The mutation changes the condition from checking if process.toString() === "[object process]"
    // to checking if process.toString() === "", which would fail to detect Node.js properly

    // Store the original process.nextTick
    const originalNextTick = process.nextTick;
    let nextTickCalled = false;

    // Override process.nextTick to track if it's called
    process.nextTick = function(callback) {
      nextTickCalled = true;
      originalNextTick.call(process, callback);
    };

    // Create a promise that should use nextTick in Node.js environment
    const promise = Q.resolve("test");

    // Return a promise that will resolve after giving time for the promise to process
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // Restore original nextTick
        process.nextTick = originalNextTick;

        // In the original code, nextTick should be used in Node.js environment
        // In the mutated code, it won't detect Node.js properly and won't use nextTick
        expect(nextTickCalled).toBe(true);
        resolve();
      }, 50);
    });
  });
});