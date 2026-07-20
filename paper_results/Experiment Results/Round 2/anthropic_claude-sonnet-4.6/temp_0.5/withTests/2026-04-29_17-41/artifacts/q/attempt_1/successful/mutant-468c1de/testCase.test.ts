import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
  it("does not duplicate stack frames when an error is rethrown through multiple promise chains", async () => {
    Q.longStackSupport = true;

    try {
      const REASON = "test error for stack trace duplication check";

      function func1() {
        return func2()
          .catch(function rethrow(err: Error) { throw err; })
          .catch(function rethrow(err: Error) { throw err; });
      }

      function func2() {
        return Q().then(function () {
          return func3();
        });
      }

      function func3() {
        return Q.reject(new Error(REASON));
      }

      let caughtError: Error | null = null;
      await func1().catch(function (err: Error) {
        caughtError = err;
      });

      expect(caughtError).not.toBeNull();
      const stack = (caughtError as unknown as Error).stack as string;

      // The stack should contain func3 and func2 and func1
      expect(stack).toMatch(/func3/);
      expect(stack).toMatch(/func2/);
      expect(stack).toMatch(/func1/);

      // In the original code, func1 should appear only once because
      // __minimumStackCounter__ prevents duplicate stack entries.
      // In the mutated code, func1 would appear multiple times because
      // the counter check is replaced with `true`, causing all stacks to be appended.
      const func1Occurrences = (stack.match(/func1/g) || []).length;
      expect(func1Occurrences).toBe(1);
    } finally {
      Q.longStackSupport = false;
    }
  });
});