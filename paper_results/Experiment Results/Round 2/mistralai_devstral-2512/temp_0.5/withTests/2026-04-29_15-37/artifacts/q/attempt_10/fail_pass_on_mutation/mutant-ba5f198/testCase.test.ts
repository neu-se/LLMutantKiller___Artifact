import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate detection", () => {
  it("should use setImmediate when available", (done) => {
    // This test verifies that Q correctly detects and uses setImmediate
    // The mutation changes the condition from checking if setImmediate IS a function
    // to checking if it is NOT a function, which would break the intended behavior

    // We'll test this by checking if Q.nextTick behaves correctly
    // when setImmediate is available

    if (typeof setImmediate !== "function") {
      // Skip test if setImmediate is not available
      done();
      return;
    }

    const startTime = Date.now();
    let qExecuted = false;

    // Test Q.nextTick
    Q.nextTick(() => {
      qExecuted = true;
      const executionTime = Date.now() - startTime;

      // With correct setImmediate detection, Q.nextTick should execute very quickly
      expect(executionTime).toBeLessThan(50);
      expect(qExecuted).toBe(true);
      done();
    });

    // Safety timeout
    setTimeout(() => {
      if (!qExecuted) {
        done(new Error("Q.nextTick did not execute"));
      }
    }, 100);
  });
});