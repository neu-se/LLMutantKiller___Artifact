import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
  it("does not add duplicate stack sections when an error propagates through multiple promise hops", async () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      // Create a chain where an error is rethrown multiple times.
      // With the original code, __minimumStackCounter__ ensures each promise's
      // stack is only appended once. With the mutation (property name ""),
      // the counter is never stored on the error, so stacks accumulate on every
      // makeStackTraceLong call, causing func1 to appear more than once.
      function level1(): Q.Promise<never> {
        return level2()
          .catch(function catchInLevel1(err: Error) { throw err; });
      }

      function level2(): Q.Promise<never> {
        return level3()
          .catch(function catchInLevel2(err: Error) { throw err; });
      }

      function level3(): Q.Promise<never> {
        return Q.reject(new Error("original error"));
      }

      let caughtError: Error | null = null;
      await level1().catch((err: Error) => {
        caughtError = err;
      });

      expect(caughtError).not.toBeNull();
      const stack = (caughtError as unknown as Error).stack as string;

      // With the original code, __minimumStackCounter__ is set on the error,
      // preventing the same promise's stack from being appended again on
      // subsequent rethrows. So "catchInLevel1" should appear exactly once.
      // With the mutation, "" is set instead of "__minimumStackCounter__",
      // so the guard never triggers and stacks keep accumulating,
      // causing "catchInLevel1" to appear multiple times.
      const catchInLevel1Count = (stack.match(/catchInLevel1/g) || []).length;
      expect(catchInLevel1Count).toBe(1);
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});