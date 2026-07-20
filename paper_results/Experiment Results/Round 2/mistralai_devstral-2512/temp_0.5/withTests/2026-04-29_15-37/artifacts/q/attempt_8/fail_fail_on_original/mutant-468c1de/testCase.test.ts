import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces mutation test", () => {
  it("should correctly filter stack traces based on minimum stack counter", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create multiple promises that will all reject with the same error
    const sharedError = new Error("Shared error");

    // Create a chain where the same error is used in multiple promises
    const promise1 = Q.defer();
    const promise2 = Q.defer();
    const promise3 = Q.defer();

    // Set up the chain
    promise1.promise.then(() => promise2.promise)
      .then(() => promise3.promise)
      .done();

    // Reject all with the same error
    promise3.reject(sharedError);
    promise2.reject(sharedError);
    promise1.reject(sharedError);

    try {
      await promise1.promise;
      fail("Promise should have been rejected");
    } catch (caughtError: any) {
      const stack = caughtError.stack;
      const stackLines: string[] = stack.split('\n');

      // Count how many times the error's stack appears in the concatenated stack
      const errorStackLines = sharedError.stack?.split('\n').length || 0;
      const concatenatedStackCount = stackLines.filter((line: string) =>
        sharedError.stack && line.includes(sharedError.stack.split('\n')[0])
      ).length;

      // The mutation changes the filtering logic to always include stacks
      // The original code should limit how many times the same error stack appears
      // based on the minimum stack counter comparison
      expect(concatenatedStackCount).toBeLessThanOrEqual(2);

      // Verify the error message is preserved
      expect(stack).toContain("Shared error");
    }
  });
});