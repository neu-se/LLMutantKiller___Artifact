import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces mutation test", () => {
  it("should correctly filter stack traces based on minimum stack counter", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a scenario where we can observe the stack trace filtering behavior
    // by creating multiple promises in a chain that all reject with the same error
    const error = new Error("Test error");

    // Create first promise that rejects
    const promise1 = Q.reject(error);

    // Create second promise that also rejects with the same error
    // but with a different stack counter
    const promise2 = Q.delay(10).then(() => {
      throw error;
    });

    // Combine both promises and observe the stack trace
    return Q.allSettled([promise1, promise2])
      .then((results) => {
        // Both promises should be rejected
        expect(results[0].state).toBe("rejected");
        expect(results[1].state).toBe("rejected");

        // Get the first error's stack trace
        const firstError = results[0].reason as Error;
        const firstStack = firstError.stack;

        // Get the second error's stack trace
        const secondError = results[1].reason as Error;
        const secondStack = secondError.stack;

        // In the original code, the stack traces should be different
        // because the mutation affects how stack traces are filtered
        // based on the __minimumStackCounter__ property
        expect(firstStack).not.toBe(secondStack);

        // The mutation changes the condition from:
        // if (p.stack && (!error.__minimumStackCounter__ || error.__minimumStackCounter__ > p.stackCounter))
        // to:
        // if (p.stack && (true))
        // This means in the mutated version, more stack frames will be included
        // which should make the stack traces longer and potentially different

        // Count the number of stack frames in each trace
        const firstStackLines = firstStack ? firstStack.split('\n').length : 0;
        const secondStackLines = secondStack ? secondStack.split('\n').length : 0;

        // In the original code, the stack traces should have different lengths
        // because of the filtering logic
        expect(firstStackLines).not.toEqual(secondStackLines);
      })
      .finally(() => {
        // Clean up
        Q.longStackSupport = false;
      });
  });
});