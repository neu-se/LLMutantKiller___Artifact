import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces - minimumStackCounter property", () => {
  it("does not duplicate stack frames when an error is rethrown through multiple promise chains", async () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      const reason = "test error for stack trace deduplication";

      function func1() {
        return func2()
          .catch(function rethrow1(err: Error) { throw err; })
          .catch(function rethrow2(err: Error) { throw err; });
      }

      function func2() {
        return Q().then(function () {
          return func3();
        });
      }

      function func3() {
        return Q.reject(new Error(reason));
      }

      let caughtError: Error | null = null;
      await func1().catch(function (err: Error) {
        caughtError = err;
      });

      expect(caughtError).not.toBeNull();
      const stack = (caughtError as unknown as Error).stack as string;

      // The stack should contain func3, func2, func1 in order
      expect(stack).toMatch(/func3[\s\S]*func2[\s\S]*func1/);

      // With the original code, __minimumStackCounter__ prevents duplicate entries.
      // With the mutation (property name ""), the counter is never tracked,
      // so func1 would appear multiple times in the stack.
      const func1Occurrences = (stack.match(/func1/g) || []).length;
      expect(func1Occurrences).toBe(1);
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});