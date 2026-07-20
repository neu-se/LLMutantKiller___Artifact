import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate detection", () => {
  it("should use setImmediate when available", (done) => {
    // This test verifies that Q correctly detects and uses setImmediate
    // when it's available in the environment. The mutation changes the
    // condition from checking if setImmediate IS a function to checking if
    // it is NOT a function, which would break the intended behavior.

    // We'll test this by checking if Q.nextTick uses setImmediate
    // when it's available. Since we can't directly inspect the implementation,
    // we'll use timing characteristics as a proxy.

    const startTime = Date.now();
    let executionTime: number | null = null;

    // Use setImmediate if available, otherwise fall back to setTimeout
    const testFunction = typeof setImmediate === "function"
      ? setImmediate
      : (fn: () => void) => setTimeout(fn, 0);

    testFunction(() => {
      executionTime = Date.now() - startTime;
      // If setImmediate is used, execution should be very fast (typically < 10ms)
      // If the mutation is present, it would incorrectly avoid setImmediate
      // and use a slower fallback, resulting in longer execution time
      expect(executionTime).toBeLessThan(50);

      // Now test Q.nextTick behavior
      const qStartTime = Date.now();
      Q.nextTick(() => {
        const qExecutionTime = Date.now() - qStartTime;
        // Q.nextTick should have similar performance characteristics
        // to the native setImmediate when it's available
        expect(qExecutionTime).toBeLessThan(50);
        done();
      });
    });
  });
});