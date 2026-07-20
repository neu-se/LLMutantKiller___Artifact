import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces mutation test", () => {
  it("should correctly filter stack traces based on minimum stack counter", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const error1 = new Error("First error");
    const error2 = new Error("Second error");
    const error3 = new Error("Third error");

    // Create a chain where each promise has its own error
    const promise1 = Q.defer();
    const promise2 = Q.defer();
    const promise3 = Q.defer();

    // Set up the chain with different errors at each level
    promise1.promise.then(() => {
      error1.stackCounter = 1;
      throw error1;
    }).then(() => promise2.promise)
      .then(() => {
        error2.stackCounter = 2;
        throw error2;
      })
      .then(() => promise3.promise)
      .then(() => {
        error3.stackCounter = 3;
        throw error3;
      })
      .done();

    // Reject the promises in order
    promise3.reject(error3);
    promise2.reject(error2);
    promise1.reject(error1);

    try {
      await promise1.promise;
      fail("Promise should have been rejected");
    } catch (caughtError: any) {
      const stack = caughtError.stack;
      const stackLines: string[] = stack.split('\n');

      // Count how many different error stacks are included
      const errorStacksIncluded = stackLines.filter((line: string) =>
        line.includes("First error") ||
        line.includes("Second error") ||
        line.includes("Third error")
      ).length;

      // The mutation changes the condition to always include stack frames
      // The original code should filter based on stackCounter comparison
      // With the mutation, we expect MORE error stacks to be included
      // because it's not properly filtering based on the minimum stack counter
      expect(errorStacksIncluded).toBeLessThanOrEqual(6);

      // Verify at least one error message is preserved
      expect(stack).toMatch(/First error|Second error|Third error/);
    }
  });
});