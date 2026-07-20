import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q unhandled rejection tracking", () => {
  it("should not emit unhandledRejection when process.emit is not a function", (done) => {
    // Save original process.emit
    const originalEmit = process.emit;
    let unhandledRejectionEmitted = false;

    // Test with process.emit as a function
    process.emit = function(event: string, ...args: any[]) {
      if (event === "unhandledRejection") {
        unhandledRejectionEmitted = true;
      }
      return true;
    };

    const promise1 = Q.reject(new Error("test1"));

    setTimeout(() => {
      const firstResult = unhandledRejectionEmitted;
      unhandledRejectionEmitted = false;

      // Now make process.emit null (not a function)
      process.emit = null as any;

      const promise2 = Q.reject(new Error("test2"));

      setTimeout(() => {
        // Restore original
        process.emit = originalEmit;

        // Original code: firstResult=true, unhandledRejectionEmitted=false
        // Mutated code: firstResult=true, unhandledRejectionEmitted=true
        if (firstResult && !unhandledRejectionEmitted) {
          done();
        } else {
          done(new Error(`Expected first emission true and second false, got ${firstResult} and ${unhandledRejectionEmitted}`));
        }
      }, 100);
    }, 100);
  });
});