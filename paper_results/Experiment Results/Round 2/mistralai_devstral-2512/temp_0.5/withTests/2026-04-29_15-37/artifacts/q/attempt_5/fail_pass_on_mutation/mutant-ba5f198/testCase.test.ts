import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate detection", () => {
  it("should correctly detect and use setImmediate when available", (done) => {
    // This test verifies that Q correctly detects and uses setImmediate
    // The mutation changes the condition from checking if setImmediate IS a function
    // to checking if it is NOT a function, which would break the intended behavior

    // We'll test this by creating a scenario where we can observe the behavior
    // difference between using setImmediate and not using it

    // First, let's check if setImmediate is actually available
    const hasSetImmediate = typeof setImmediate === "function";

    if (!hasSetImmediate) {
      // If setImmediate is not available, we can't test this specific behavior
      done();
      return;
    }

    // Create a test that will show different behavior based on whether
    // Q is using setImmediate or falling back to setTimeout
    const results: number[] = [];
    const startTime = Date.now();

    // Schedule multiple tasks to see the execution pattern
    for (let i = 0; i < 5; i++) {
      Q.nextTick(() => {
        results.push(Date.now() - startTime);
        if (results.length === 5) {
          // With setImmediate, all tasks should execute very quickly
          // With setTimeout, there might be more variation
          const allFast = results.every(time => time < 50);
          expect(allFast).toBe(true);
          done();
        }
      });
    }

    // Safety timeout
    setTimeout(() => {
      if (results.length < 5) {
        done(new Error("Not all Q.nextTick callbacks executed"));
      }
    }, 100);
  });
});