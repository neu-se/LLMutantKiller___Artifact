import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate detection", () => {
  it("should correctly use setImmediate when available", (done) => {
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
    const startTime = Date.now();
    let qExecutionTime: number | null = null;

    // Test Q.nextTick timing
    Q.nextTick(() => {
      qExecutionTime = Date.now() - startTime;

      // With correct setImmediate detection, Q.nextTick should execute very quickly
      // If the mutation is present, it would incorrectly avoid setImmediate
      // and use a slower fallback, resulting in longer execution time
      expect(qExecutionTime).toBeLessThan(20);
      done();
    });

    // Safety timeout
    setTimeout(() => {
      if (qExecutionTime === null) {
        done(new Error("Q.nextTick did not execute"));
      }
    }, 100);
  });
});