import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces mutation test", () => {
  it("should correctly filter stack traces based on minimum stack counter", async () => {
    // Create a chain of promises to build up a stack trace
    Q.longStackSupport = true;

    function createPromiseWithStack(depth: number, error: Error): Promise<any> {
      if (depth <= 0) {
        return Q.reject(error);
      }
      return Q().then(() => createPromiseWithStack(depth - 1, error));
    }

    const originalError = new Error("Test error");
    const promiseChain = createPromiseWithStack(5, originalError);

    try {
      await promiseChain;
      fail("Promise should have been rejected");
    } catch (error) {
      // The mutation would cause all stack traces to be included
      // regardless of their stack counter, which would make the
      // stack trace unnecessarily long
      const stack = error.stack;
      const stackLines = stack.split('\n').filter(line => line.trim() !== '');

      // With the mutation, we expect more stack frames to be included
      // than necessary, which would make the stack trace longer than
      // it should be for proper error tracking
      expect(stackLines.length).toBeLessThan(20);
    }
  });
});