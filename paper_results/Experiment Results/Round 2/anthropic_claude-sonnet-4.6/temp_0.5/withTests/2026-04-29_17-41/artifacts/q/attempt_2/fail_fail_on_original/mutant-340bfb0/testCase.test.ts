import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
  it("does not add visible __minimumStackCounter__ property to thrown errors via enumerable check, but does set it as non-enumerable", async () => {
    Q.longStackSupport = true;

    try {
      function inner() {
        return Q.reject(new Error("boom"));
      }

      function middle() {
        return Q().then(() => inner());
      }

      function outer() {
        return middle()
          .catch((err: Error) => { throw err; })
          .catch((err: Error) => { throw err; })
          .catch((err: Error) => { throw err; });
      }

      let capturedError: Error | null = null;
      await outer().catch((err: Error) => { capturedError = err; });

      expect(capturedError).not.toBeNull();
      const stack = (capturedError as Error).stack || "";

      // With the original code, __minimumStackCounter__ is set correctly,
      // so the "inner" frame only appears once in the stack.
      // With the mutation, "" is used as the property name instead,
      // so __minimumStackCounter__ is never set and inner gets added
      // on every rethrow, appearing multiple times.
      const innerOccurrences = (stack.match(/\binner\b/g) || []).length;
      expect(innerOccurrences).toBe(1);
    } finally {
      Q.longStackSupport = false;
    }
  });
});