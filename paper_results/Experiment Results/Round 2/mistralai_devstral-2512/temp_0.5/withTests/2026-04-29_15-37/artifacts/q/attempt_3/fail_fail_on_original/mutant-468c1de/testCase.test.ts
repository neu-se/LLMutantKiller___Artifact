import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces mutation test", () => {
  it("should correctly filter stack traces based on minimum stack counter", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const deferred3 = Q.defer();

    const error = new Error("Test error");

    // Build a chain where each promise rejects after the next
    deferred1.promise.then(() => deferred2.promise)
      .then(() => deferred3.promise)
      .then(() => { throw error; })
      .done();

    // Reject in reverse order to create stack trace context
    setTimeout(() => deferred3.reject(error), 10);
    setTimeout(() => deferred2.reject(error), 5);
    setTimeout(() => deferred1.reject(error), 0);

    try {
      await deferred1.promise;
      fail("Promise should have been rejected");
    } catch (caughtError: any) {
      const stack = caughtError.stack;
      const stackLines = stack.split('\n').filter((line: string) => line.trim() !== '');

      // The mutation changes the condition from checking stack counters to always true
      // This means the mutated version will include ALL stack frames in the chain
      // while the original version filters some out based on stack counters
      // We expect the original to have fewer stack frames than the mutated version
      expect(stackLines.length).toBeLessThan(20);

      // Verify the error message is preserved
      expect(stack).toContain("Test error");
    }
  });
});