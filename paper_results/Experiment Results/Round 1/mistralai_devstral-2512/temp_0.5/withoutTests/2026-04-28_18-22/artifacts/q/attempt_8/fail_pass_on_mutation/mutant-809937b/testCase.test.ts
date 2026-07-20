import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q unhandled rejection tracking", () => {
  it("should not emit unhandledRejection when process.emit is not a function", (done) => {
    // Save original process.emit
    const originalEmit = process.emit;
    let unhandledRejectionCount = 0;

    // Test with process.emit as a function
    process.emit = function(event: string, ...args: any[]) {
      if (event === "unhandledRejection") {
        unhandledRejectionCount++;
      }
      return true;
    };

    const promise1 = Q.reject(new Error("test1"));

    setTimeout(() => {
      const firstCount = unhandledRejectionCount;

      // Now make process.emit undefined (not a function)
      process.emit = undefined as any;

      const promise2 = Q.reject(new Error("test2"));

      setTimeout(() => {
        // Restore original
        process.emit = originalEmit;

        // Original code: firstCount=1, unhandledRejectionCount=1 (no second emission)
        // Mutated code: firstCount=1, unhandledRejectionCount=2 (second emission happens)
        if (unhandledRejectionCount === firstCount) {
          done();
        } else {
          done(new Error(`Expected ${firstCount} unhandled rejections but got ${unhandledRejectionCount}`));
        }
      }, 100);
    }, 100);
  });
});