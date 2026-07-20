import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q unhandled rejection tracking", () => {
  it("should only emit unhandledRejection when process.emit is a function", (done) => {
    // Save the original process.emit
    const originalEmit = process.emit;
    let unhandledRejectionCount = 0;

    // Mock process.emit to track calls
    process.emit = function(event: string, ...args: any[]) {
      if (event === "unhandledRejection") {
        unhandledRejectionCount++;
      }
      return true;
    };

    // Test case 1: Create rejected promise when process.emit is a function
    const rejectedPromise1 = Q.reject(new Error("test error 1"));

    // Give time for the unhandled rejection tracking to occur
    setTimeout(() => {
      const countAfterFirst = unhandledRejectionCount;

      // Test case 2: Now make process.emit not a function
      process.emit = undefined as any;

      // Create another rejected promise
      const rejectedPromise2 = Q.reject(new Error("test error 2"));

      setTimeout(() => {
        // Restore the original process.emit
        process.emit = originalEmit;

        // In original code: countAfterFirst should be 1, final count should be 1
        // In mutated code: countAfterFirst should be 1, final count should be 2
        // (because mutation changes condition to always true)
        if (unhandledRejectionCount !== countAfterFirst) {
          done(new Error(`Expected ${countAfterFirst} unhandled rejections but got ${unhandledRejectionCount}`));
        } else {
          done();
        }
      }, 100);
    }, 100);
  });
});