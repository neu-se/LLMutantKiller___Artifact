import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces deduplication", () => {
  it("does not duplicate stack frames when an error is rethrown through multiple catch handlers", async () => {
    Q.longStackSupport = true;

    try {
      function func3() {
        return Q.reject(new Error("original error"));
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
      const stack = (capturedError as unknown as Error).stack as string;

      // Count occurrences of "rethrow1" in the stack - should appear only once
      const rethrow1Count = (stack.match(/rethrow1/g) || []).length;
      expect(rethrow1Count).toBe(1);

      // Count occurrences of "rethrow2" in the stack - should appear only once
      const rethrow2Count = (stack.match(/rethrow2/g) || []).length;
      expect(rethrow2Count).toBe(1);
    } finally {
      Q.longStackSupport = false;
    }
  });
});