import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q unhandled rejection tracking", () => {
  it("should correctly check process.emit type before emitting unhandledRejection", (done) => {
    // Save original process.emit
    const originalEmit = process.emit;
    let emissionCount = 0;

    // Test with process.emit as a function
    process.emit = function(event: string, ...args: any[]) {
      if (event === "unhandledRejection") {
        emissionCount++;
      }
      return true;
    };

    const promise1 = Q.reject(new Error("test1"));

    setTimeout(() => {
      const firstCount = emissionCount;

      // Now make process.emit a non-function object
      process.emit = { notAFunction: true } as any;

      const promise2 = Q.reject(new Error("test2"));

      setTimeout(() => {
        // Restore original
        process.emit = originalEmit;

        // Original code: firstCount=1, emissionCount=1 (no second emission)
        // Mutated code: firstCount=1, emissionCount=2 (second emission happens)
        if (emissionCount === firstCount) {
          done();
        } else {
          done(new Error(`Expected ${firstCount} emissions but got ${emissionCount}`));
        }
      }, 100);
    }, 100);
  });
});