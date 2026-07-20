import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate detection", () => {
  it("should correctly detect setImmediate availability", (done) => {
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
    let nativeExecutionTime: number | null = null;

    // Test native setImmediate timing
    setImmediate(() => {
      nativeExecutionTime = Date.now() - startTime;
    });

    // Test Q.nextTick timing
    Q.nextTick(() => {
      qExecutionTime = Date.now() - startTime;

      // Both should have executed by now
      if (nativeExecutionTime !== null && qExecutionTime !== null) {
        // With correct setImmediate detection, both should execute in similar time
        // If the mutation is present, Q.nextTick might be significantly slower
        const timeDifference = Math.abs(nativeExecutionTime - qExecutionTime);
        expect(timeDifference).toBeLessThan(20);
        done();
      }
    });

    // Safety timeout
    setTimeout(() => {
      if (qExecutionTime === null || nativeExecutionTime === null) {
        done(new Error("Not all callbacks executed"));
      }
    }, 100);
  });
});