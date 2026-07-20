import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces mutation test", () => {
  it("should correctly filter stack traces based on minimum stack counter", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise that will be rejected multiple times in a chain
    const originalError = new Error("Original error");

    // Create a chain where the same error is propagated through multiple promises
    const promiseChain = Q.reject(originalError)
      .then(() => { throw originalError; })
      .then(() => { throw originalError; })
      .then(() => { throw originalError; });

    try {
      await promiseChain;
      fail("Promise should have been rejected");
    } catch (caughtError: any) {
      const stack = caughtError.stack;
      const stackLines: string[] = stack.split('\n');

      // Count the number of "From previous event" separators
      const previousEventCount = stackLines.filter((line: string) =>
        line.includes("From previous event")
      ).length;

      // The mutation changes the condition from:
      // if (p.stack && (!error.__minimumStackCounter__ || error.__minimumStackCounter__ > p.stackCounter))
      // to:
      // if (p.stack && (true))
      //
      // This means the mutated version will include ALL stack frames
      // while the original version should filter some out based on stack counters
      // We expect the original to have fewer "From previous event" separators
      expect(previousEventCount).toBeLessThanOrEqual(2);

      // Verify the error message is preserved
      expect(stack).toContain("Original error");
    }
  });
});