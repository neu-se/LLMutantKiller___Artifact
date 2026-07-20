import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces mutation test", () => {
  it("should correctly filter stack traces based on minimum stack counter", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a simple promise chain that will generate stack traces
    const error = new Error("Test error");

    // Create a promise that rejects after going through several then calls
    const promise = Q().then(() => {
      return Q().then(() => {
        return Q().then(() => {
          throw error;
        });
      });
    });

    try {
      await promise;
      fail("Promise should have been rejected");
    } catch (caughtError: any) {
      const stack = caughtError.stack;
      const stackLines = stack.split('\n').filter((line: string) => line.trim() !== '');

      // The mutation changes the condition from:
      // if (p.stack && (!error.__minimumStackCounter__ || error.__minimumStackCounter__ > p.stackCounter))
      // to:
      // if (p.stack && (true))
      //
      // This means the mutated version will include ALL stack frames
      // while the original version filters some out based on stack counters
      // We need to verify the original behavior filters correctly

      // Count how many times "From previous event" appears in the stack
      const previousEventCount = (stack.match(/From previous event/g) || []).length;

      // The original code should limit the number of "From previous event" occurrences
      // based on the stack counter comparison, while the mutated version would include all
      expect(previousEventCount).toBeLessThanOrEqual(3);

      // Verify the error message is preserved
      expect(stack).toContain("Test error");
    }
  });
});