import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
  it("should include calling function names from the promise chain in the stack trace", async () => {
    Q.longStackSupport = true;

    try {
      let capturedError: Error | null = null;

      function outerFunction() {
        return Q().then(function innerFunction() {
          return Q.reject(new Error("test error"));
        });
      }

      await outerFunction().then(null, function (err: Error) {
        capturedError = err;
      });

      expect(capturedError).not.toBeNull();
      expect(capturedError!.stack).toBeDefined();
      // With the original code, the loop walks the promise source chain and
      // concatenates stack traces, so the stack should contain "From previous event:"
      // With the mutated code (for ... false ...), the loop never executes,
      // so no stack concatenation happens and "From previous event:" won't appear.
      expect(capturedError!.stack).toContain("From previous event:");
    } finally {
      Q.longStackSupport = false;
    }
  });
});