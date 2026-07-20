import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString via long stack traces", () => {
  it("should preserve non-internal stack frames when building long stack traces", async () => {
    Q.longStackSupport = true;

    try {
      function outerFunction(): Promise<void> {
        return Q().then(function innerFunction() {
          throw new Error("test error from user code");
        });
      }

      let capturedError: Error | null = null;

      await outerFunction().then(null, function (err: Error) {
        capturedError = err;
      });

      expect(capturedError).not.toBeNull();
      expect(capturedError!.stack).toBeDefined();
      // The stack should contain non-empty content (user frames preserved)
      // In the mutated version, filterStackString returns "" causing the stack
      // to be replaced with an empty string
      expect(capturedError!.stack!.length).toBeGreaterThan(0);
      // The stack should contain the error message or function names
      // indicating that actual stack frames were preserved
      expect(capturedError!.stack).toMatch(/test error from user code|innerFunction|outerFunction/);
    } finally {
      Q.longStackSupport = false;
    }
  });
});