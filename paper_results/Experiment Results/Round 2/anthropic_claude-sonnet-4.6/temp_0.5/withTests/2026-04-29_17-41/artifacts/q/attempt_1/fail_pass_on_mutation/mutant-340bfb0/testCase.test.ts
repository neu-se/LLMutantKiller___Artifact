import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces deduplication", () => {
  it("does not add duplicate stack frames when an error is rethrown through multiple catch handlers with long stack support enabled", async () => {
    Q.longStackSupport = true;

    try {
      function func3() {
        return Q.reject(new Error("test error"));
      }

      function func2() {
        return Q().then(function () {
          return func3();
        });
      }

      function func1() {
        return func2()
          .catch(function rethrow1(err) { throw err; })
          .catch(function rethrow2(err) { throw err; });
      }

      let capturedError: Error | null = null;

      await func1().catch(function (err: Error) {
        capturedError = err;
      });

      expect(capturedError).not.toBeNull();
      const stack = (capturedError as unknown as Error).stack || "";

      // With the original code, __minimumStackCounter__ is set correctly,
      // preventing duplicate stack entries. With the mutation, the property
      // name is "" so deduplication fails and func2 appears multiple times.
      const func2Occurrences = (stack.match(/func2/g) || []).length;
      expect(func2Occurrences).toBe(1);
    } finally {
      Q.longStackSupport = false;
    }
  });
});