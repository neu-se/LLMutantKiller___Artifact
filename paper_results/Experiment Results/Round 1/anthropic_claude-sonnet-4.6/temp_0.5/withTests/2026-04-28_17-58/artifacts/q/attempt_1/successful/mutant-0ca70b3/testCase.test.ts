import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString via long stack traces", () => {
  it("should include non-internal frames in the stack trace when long stack support is enabled", async () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      let capturedError: any = null;

      await Q()
        .then(function outerFunction() {
          return Q.reject(new Error("test error from long stack trace test"));
        })
        .catch(function catchHandler(err: any) {
          capturedError = err;
        });

      expect(capturedError).not.toBeNull();
      expect(capturedError.stack).toBeDefined();
      // The stack should be a non-empty string containing the error message
      // With the mutation, filterStackString returns "" causing the stack to be empty/broken
      expect(typeof capturedError.stack).toBe("string");
      expect(capturedError.stack.length).toBeGreaterThan(0);
      // The stack should contain the error message or function names
      // With the mutated loop (i >= lines.length), all lines are filtered out
      // resulting in an empty string joined result
      expect(capturedError.stack).toMatch(/test error|outerFunction|catchHandler|\w+/);
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});