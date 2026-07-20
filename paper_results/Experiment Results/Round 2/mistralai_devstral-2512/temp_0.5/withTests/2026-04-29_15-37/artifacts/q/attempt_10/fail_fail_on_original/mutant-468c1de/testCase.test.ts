import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces mutation test", () => {
  it("should correctly filter stack traces based on minimum stack counter", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate multiple rejection points
    const error = new Error("Test error");

    // Create multiple deferred promises
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const deferred3 = Q.defer();

    // Build a chain where each deferred rejects with the same error
    deferred1.promise.then(() => deferred2.promise)
      .then(() => deferred3.promise)
      .done();

    // Reject all deferreds with the same error
    deferred3.reject(error);
    deferred2.reject(error);
    deferred1.reject(error);

    try {
      await deferred1.promise;
      fail("Promise should have been rejected");
    } catch (caughtError: any) {
      const stack = caughtError.stack;
      const stackLines: string[] = stack.split('\n');

      // Count how many times we see the error's stack in the concatenated stack
      const errorStackSignature = error.stack?.split('\n')[0] || '';
      const errorStackCount = stackLines.filter((line: string) =>
        line.includes(errorStackSignature)
      ).length;

      // The mutation changes the condition to always include stack frames
      // The original code should limit how many times the same error stack appears
      // based on the minimum stack counter comparison
      // With the mutation, we expect the same error stack to appear more times
      expect(errorStackCount).toBeLessThanOrEqual(2);

      // Verify the error message is preserved
      expect(stack).toContain("Test error");
    }
  });
});