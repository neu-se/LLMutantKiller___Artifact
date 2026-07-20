import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces - minimumStackCounter behavior", () => {
  it("does not include stack frames from promises created after the rejection when rethrowing", async () => {
    Q.longStackSupport = true;

    try {
      const REASON = "test error for stack trace mutation detection";

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
        return Q.reject(new Error(REASON));
      }

      let capturedError: Error | null = null;
      await func1().catch(function (err: Error) {
        capturedError = err;
      });

      expect(capturedError).not.toBeNull();
      const stack = (capturedError as unknown as Error).stack || "";

      // func1 should appear exactly once in the stack trace
      // With the mutation (true instead of counter check), func1 may appear
      // multiple times because stacks from promises created after rejection
      // are also included
      const func1Occurrences = (stack.match(/func1/g) || []).length;
      expect(func1Occurrences).toBe(1);
    } finally {
      Q.longStackSupport = false;
    }
  });
});