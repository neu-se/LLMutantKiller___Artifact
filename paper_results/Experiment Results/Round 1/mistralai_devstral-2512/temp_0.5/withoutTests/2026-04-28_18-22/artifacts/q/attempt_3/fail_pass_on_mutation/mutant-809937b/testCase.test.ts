import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q unhandled rejection tracking", () => {
  it("should emit unhandledRejection when process.emit exists but mutation changes condition", (done) => {
    // Save the original process.emit
    const originalEmit = process.emit;
    let unhandledRejectionEmitted = false;

    // Mock process.emit to track calls
    process.emit = function(event: string, ...args: any[]) {
      if (event === "unhandledRejection") {
        unhandledRejectionEmitted = true;
      }
      return (originalEmit as Function).apply(process, [event, ...args]);
    };

    // Create a rejected promise that should be tracked
    const rejectedPromise = Q.reject(new Error("test error"));

    // Give time for the unhandled rejection tracking to occur
    setTimeout(() => {
      // Restore the original process.emit
      process.emit = originalEmit;

      // In the original code, this should emit unhandledRejection
      // In the mutated code, it will always try to emit (due to `true` condition)
      // But we need to verify the behavior difference
      if (!unhandledRejectionEmitted) {
        done(new Error("unhandledRejection was not emitted as expected"));
      } else {
        done();
      }
    }, 100);
  });
});