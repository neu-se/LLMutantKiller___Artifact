import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate detection", () => {
  it("should use setImmediate when available", (done) => {
    // This test verifies that Q correctly detects and uses setImmediate
    // The mutation changes the condition from checking if setImmediate IS a function
    // to checking if it is NOT a function, which would break the intended behavior

    // We'll test this by checking if Q.nextTick uses setImmediate
    // when it's available by observing the execution timing

    if (typeof setImmediate !== "function") {
      // Skip test if setImmediate is not available
      done();
      return;
    }

    const startTime = Date.now();
    let executionCount = 0;

    // Schedule multiple Q.nextTick calls
    for (let i = 0; i < 10; i++) {
      Q.nextTick(() => {
        executionCount++;
        if (executionCount === 10) {
          const totalTime = Date.now() - startTime;
          // With correct setImmediate detection, all tasks should execute very quickly
          // If the mutation is present, it would incorrectly avoid setImmediate
          // and use a slower fallback, resulting in longer execution time
          expect(totalTime).toBeLessThan(50);
          done();
        }
      });
    }

    // Safety timeout
    setTimeout(() => {
      if (executionCount < 10) {
        done(new Error("Not all Q.nextTick callbacks executed"));
      }
    }, 100);
  });
});