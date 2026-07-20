import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces mutation test", () => {
  it("should correctly filter stack traces based on minimum stack counter", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a chain of promises to build up a stack trace
    function createPromiseChain(depth: number, error: Error): any {
      if (depth <= 0) {
        return Q.reject(error);
      }
      return Q().then(() => createPromiseChain(depth - 1, error));
    }

    const originalError = new Error("Test error");
    const promiseChain = createPromiseChain(3, originalError);

    try {
      await promiseChain;
      fail("Promise should have been rejected");
    } catch (error: any) {
      const stack = error.stack;
      // Count non-empty lines in the stack trace
      const stackLines = stack.split('\n').filter((line: string) => line.trim() !== '');

      // With the mutation (always true condition), we expect more stack frames
      // to be included than necessary, making the stack trace longer
      // The original code should filter out some frames, resulting in fewer lines
      expect(stackLines.length).toBeLessThanOrEqual(15);

      // Also verify the error message is preserved
      expect(stack).toContain("Test error");
    }
  });
});