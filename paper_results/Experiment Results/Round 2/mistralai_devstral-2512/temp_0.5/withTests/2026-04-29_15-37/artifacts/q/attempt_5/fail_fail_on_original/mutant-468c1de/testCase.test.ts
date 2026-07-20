import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces mutation test", () => {
  it("should correctly filter stack traces based on minimum stack counter", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain with multiple levels to generate stack traces
    let error: Error;

    // First promise in the chain
    const promise1 = Q.defer();
    // Second promise that will be rejected
    const promise2 = Q.defer();
    // Third promise that will also be rejected
    const promise3 = Q.defer();

    // Build the chain
    promise1.promise.then(() => promise2.promise)
      .then(() => promise3.promise)
      .then(() => {
        throw new Error("Final error");
      })
      .done();

    // Create the error that will be thrown
    error = new Error("Test error");

    // Set up the rejection chain with specific timing
    setTimeout(() => {
      promise3.reject(error);
    }, 20);

    setTimeout(() => {
      promise2.reject(error);
    }, 10);

    setTimeout(() => {
      promise1.reject(error);
    }, 0);

    try {
      await promise1.promise;
      fail("Promise should have been rejected");
    } catch (caughtError: any) {
      const stack = caughtError.stack;
      const stackLines = stack.split('\n');

      // Count the number of stack frames that contain "From previous event"
      const previousEventFrames = stackLines.filter(line =>
        line.includes("From previous event")
      ).length;

      // The mutation changes the condition to always include stack frames
      // The original code filters based on stackCounter comparison
      // With the mutation, we expect MORE "From previous event" frames
      // because it's not filtering properly
      expect(previousEventFrames).toBeLessThan(5);

      // Verify the error message is preserved
      expect(stack).toContain("Test error");
    }
  });
});