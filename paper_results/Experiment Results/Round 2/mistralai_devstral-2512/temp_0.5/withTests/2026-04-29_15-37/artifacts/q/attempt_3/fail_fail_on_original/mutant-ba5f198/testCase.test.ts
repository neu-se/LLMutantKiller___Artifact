import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate detection", () => {
  it("should correctly use setImmediate when available", (done) => {
    // This test verifies that Q correctly detects and uses setImmediate
    // The mutation changes the condition from checking if setImmediate IS a function
    // to checking if it is NOT a function, which would break the intended behavior

    // We'll test this by creating a scenario where setImmediate is available
    // and verifying that Q uses it (by checking timing characteristics)

    // First verify setImmediate is available in this environment
    if (typeof setImmediate !== "function") {
      done();
      return;
    }

    // Track execution order
    const executionOrder: string[] = [];
    const startTime = Date.now();

    // Test native setImmediate timing
    setImmediate(() => {
      executionOrder.push("native");
    });

    // Test Q.nextTick timing - should be similar to setImmediate when available
    Q.nextTick(() => {
      executionOrder.push("q");

      // Both should have executed by now
      expect(executionOrder).toEqual(["native", "q"]);

      // The key test: Q.nextTick should execute in a similar timeframe
      // as native setImmediate when setImmediate is available
      const totalTime = Date.now() - startTime;
      expect(totalTime).toBeLessThan(100);
      done();
    });
  });
});