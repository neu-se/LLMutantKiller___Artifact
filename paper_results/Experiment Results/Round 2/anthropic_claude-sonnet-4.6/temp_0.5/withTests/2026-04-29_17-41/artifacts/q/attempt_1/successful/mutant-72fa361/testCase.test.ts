import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
  it("should augment the error stack with the promise chain stack when longStackSupport is enabled", async () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      function outerFunction() {
        return Q().then(function innerFunction() {
          return Q.reject(new Error("test error"));
        });
      }

      let capturedError: Error | null = null;

      await outerFunction().then(null, function (err: Error) {
        capturedError = err;
      });

      expect(capturedError).not.toBeNull();
      expect(capturedError!.stack).toBeDefined();

      // With the original makeStackTraceLong, the stack should contain
      // the STACK_JUMP_SEPARATOR "From previous event:" indicating that
      // the promise chain stacks were concatenated.
      // With the mutated empty function, the stack will only contain
      // the original error stack without any concatenation.
      expect(capturedError!.stack).toContain("From previous event:");
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});