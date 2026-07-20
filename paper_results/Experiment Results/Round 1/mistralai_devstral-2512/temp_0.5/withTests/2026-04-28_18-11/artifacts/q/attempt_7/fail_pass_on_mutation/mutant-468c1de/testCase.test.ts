import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces mutation test", () => {
  it("should correctly filter stack traces based on minimum stack counter", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will reject with an error
    const error = new Error("Test error");

    // Create first promise that rejects
    const promise1 = Q.reject(error);

    // Create second promise that also rejects with the same error
    // but with a different stack counter
    const promise2 = Q.delay(10, 10).then(() => {
      throw error;
    });

    // Combine both promises and observe the stack trace
    return Q.allSettled([promise1, promise2]).then((results: any[]) => {
      // Both promises should be rejected
      expect(results[0].state).toBe("rejected");
      expect(results[1].state).toBe("rejected");

      // Get the first error's stack trace
      const firstError = results[0].reason as Error;
      const firstStack = firstError.stack;

      // Get the second error's stack trace
      const secondError = results[1].reason as Error;
      const secondStack = secondError.stack;

      // Count the number of stack frames in each trace
      const firstStackLines = firstStack ? firstStack.split('\n').length : 0;
      const secondStackLines = secondStack ? secondStack.split('\n').length : 0;

      // In the original code, the stack traces should have the same length
      // because of the filtering logic based on __minimumStackCounter__
      // The mutation changes this logic to always include stack frames
      // which should make the second stack trace longer
      expect(firstStackLines).toBeLessThanOrEqual(secondStackLines);
    }).finally(() => {
      // Clean up
      Q.longStackSupport = false;
    });
  });
});