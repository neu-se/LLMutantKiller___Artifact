import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
  it("should include calling function names from the promise chain in the error stack", async () => {
    Q.longStackSupport = true;

    try {
      let capturedError: Error | null = null;

      function outerFunction() {
        return Q().then(function innerFunction() {
          return Q.reject(new Error("test error"));
        });
      }

      await outerFunction().catch((err: Error) => {
        capturedError = err;
      });

      expect(capturedError).not.toBeNull();
      expect(capturedError!.stack).toBeDefined();
      // The stack should contain "From previous event:" separator which is added
      // by makeStackTraceLong when it successfully walks the promise chain
      expect(capturedError!.stack).toContain("From previous event:");
    } finally {
      Q.longStackSupport = false;
    }
  });
});