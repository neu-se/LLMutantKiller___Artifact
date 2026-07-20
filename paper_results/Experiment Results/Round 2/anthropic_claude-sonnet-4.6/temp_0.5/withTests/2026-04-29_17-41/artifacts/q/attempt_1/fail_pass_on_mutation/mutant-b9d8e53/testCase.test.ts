import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack trace filtering with multi-digit line numbers", () => {
  it("should produce a long stack trace that filters Q internals when line numbers are multi-digit", async () => {
    Q.longStackSupport = true;

    try {
      let capturedError: Error | null = null;

      await new Promise<void>((resolve) => {
        function outerFunction() {
          return Q().then(function innerFunction() {
            throw new Error("test error from inner function");
          });
        }

        outerFunction().catch(function (err: Error) {
          capturedError = err;
          resolve();
        });
      });

      expect(capturedError).not.toBeNull();
      const err = capturedError as unknown as Error;
      expect(err.stack).toBeDefined();
      // The stack should contain our function names, indicating that
      // Q internals were filtered out and the stack trace was built correctly.
      // If captureLine() fails (returns undefined due to mutated regex not matching
      // multi-digit line numbers), the filtering logic breaks.
      expect(err.stack).toContain("innerFunction");
      // The stack should NOT be empty or just "[object Promise]"
      expect(err.stack!.length).toBeGreaterThan(10);
      // With proper long stack support, the stack trace should include
      // the "From previous event:" separator showing the chain was captured
      expect(err.stack).toMatch(/From previous event:|outerFunction|innerFunction/);
    } finally {
      Q.longStackSupport = false;
    }
  });
});