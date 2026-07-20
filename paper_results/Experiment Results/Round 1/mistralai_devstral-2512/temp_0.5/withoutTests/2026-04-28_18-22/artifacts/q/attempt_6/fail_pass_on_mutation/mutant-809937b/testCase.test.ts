import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q unhandled rejection tracking", () => {
  it("should correctly handle process.emit type checking", (done) => {
    // Save original process.emit
    const originalEmit = process.emit;
    let emissionCount = 0;

    // Test 1: process.emit is a function (should emit)
    process.emit = function(event: string, ...args: any[]) {
      if (event === "unhandledRejection") {
        emissionCount++;
      }
      return true;
    };

    const promise1 = Q.reject(new Error("test1"));
    Q.delay(50).then(() => {
      const firstCount = emissionCount;

      // Test 2: process.emit is not a function (should NOT emit in original)
      process.emit = {} as any; // Object but not function

      const promise2 = Q.reject(new Error("test2"));
      return Q.delay(50).then(() => {
        // Restore original
        process.emit = originalEmit;

        // Original: firstCount=1, emissionCount=1 (no second emission)
        // Mutated: firstCount=1, emissionCount=2 (second emission happens)
        if (emissionCount === firstCount) {
          done();
        } else {
          done(new Error(`Expected ${firstCount} emissions but got ${emissionCount}`));
        }
      });
    });
  });
});