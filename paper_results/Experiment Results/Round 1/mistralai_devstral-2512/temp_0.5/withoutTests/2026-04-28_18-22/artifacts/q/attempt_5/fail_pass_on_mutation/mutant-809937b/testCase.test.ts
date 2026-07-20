import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q unhandled rejection tracking", () => {
  it("should not emit unhandledRejection when process.emit is not a function", (done) => {
    // Save the original process.emit
    const originalEmit = process.emit;
    let unhandledRejectionEmitted = false;

    // First test with process.emit as a function
    process.emit = function(event: string, ...args: any[]) {
      if (event === "unhandledRejection") {
        unhandledRejectionEmitted = true;
      }
      return true;
    };

    const rejectedPromise1 = Q.reject(new Error("test error 1"));

    setTimeout(() => {
      const firstResult = unhandledRejectionEmitted;
      unhandledRejectionEmitted = false;

      // Now test with process.emit not being a function
      process.emit = undefined as any;

      const rejectedPromise2 = Q.reject(new Error("test error 2"));

      setTimeout(() => {
        // Restore the original process.emit
        process.emit = originalEmit;

        // In original code: firstResult should be true, second should be false
        // In mutated code: both should be true (due to `true` condition)
        if (firstResult && !unhandledRejectionEmitted) {
          done();
        } else {
          done(new Error(`Expected first emission true and second false, got ${firstResult} and ${unhandledRejectionEmitted}`));
        }
      }, 100);
    }, 100);
  });
});