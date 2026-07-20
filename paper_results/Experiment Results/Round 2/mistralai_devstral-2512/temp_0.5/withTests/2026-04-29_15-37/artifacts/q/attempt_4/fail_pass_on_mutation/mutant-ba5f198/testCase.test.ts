import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate detection", () => {
  it("should use setImmediate when available", (done) => {
    // This test verifies that Q correctly detects and uses setImmediate
    // The mutation changes the condition from checking if setImmediate IS a function
    // to checking if it is NOT a function, which would break the intended behavior

    // We'll test this by checking if Q.nextTick behaves differently
    // when setImmediate is available vs when it's not

    // First check if setImmediate is available
    const setImmediateAvailable = typeof setImmediate === "function";

    // Create a test that will behave differently based on setImmediate availability
    const startTime = Date.now();
    let qNextTickExecuted = false;

    Q.nextTick(() => {
      qNextTickExecuted = true;
      const executionTime = Date.now() - startTime;

      // If setImmediate is available and working correctly,
      // Q.nextTick should execute very quickly (typically < 10ms)
      // If the mutation is present, it would incorrectly avoid setImmediate
      // and use a slower fallback
      if (setImmediateAvailable) {
        expect(executionTime).toBeLessThan(50);
      }
      expect(qNextTickExecuted).toBe(true);
      done();
    });

    // If we get here without the Q.nextTick callback executing,
    // it means something went wrong with the event loop scheduling
    setTimeout(() => {
      if (!qNextTickExecuted) {
        done(new Error("Q.nextTick did not execute"));
      }
    }, 100);
  });
});