import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces mutation test", () => {
  it("should correctly filter stack traces based on minimum stack counter", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate multiple stack frames
    const error = new Error("Test error");

    // Create a chain of promises that will all reject with the same error
    const promise1 = Q.reject(error);
    const promise2 = promise1.then(() => { throw error; });
    const promise3 = promise2.then(() => { throw error; });

    try {
      await promise3;
      fail("Promise should have been rejected");
    } catch (caughtError: any) {
      const stack = caughtError.stack;
      const stackLines: string[] = stack.split('\n');

      // Count how many times we see stack frames from our test
      const testStackFrames = stackLines.filter((line: string) =>
        line.includes("testCase.test.ts")
      ).length;

      // The mutation changes the condition to always include stack frames
      // The original code filters based on stackCounter comparison
      // With the mutation, we expect MORE stack frames from our test file
      // because it's not properly filtering based on the minimum stack counter
      expect(testStackFrames).toBeLessThanOrEqual(5);

      // Verify the error message is preserved
      expect(stack).toContain("Test error");
    }
  });
});