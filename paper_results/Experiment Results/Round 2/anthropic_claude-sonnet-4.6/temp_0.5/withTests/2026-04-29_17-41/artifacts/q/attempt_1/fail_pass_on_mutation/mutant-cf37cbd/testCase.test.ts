import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces with multi-digit column numbers", () => {
  it("should correctly include calling function names in long stack traces when column numbers have multiple digits", async () => {
    Q.longStackSupport = true;

    try {
      let capturedError: Error | null = null;

      function outerFunction() {
        return Q().then(function innerFunction() {
          return Q.reject(new Error("test error from long stack trace"));
        });
      }

      await outerFunction().catch(function (err: Error) {
        capturedError = err;
      });

      expect(capturedError).not.toBeNull();
      // The stack trace should contain our function names
      // This relies on Q correctly parsing stack frames with multi-digit column numbers
      // With the mutation (\d instead of \d+), lines with column >= 10 won't be parsed,
      // so isInternalFrame won't work correctly, and filterStackString may behave differently
      expect((capturedError as Error).stack).toBeDefined();

      // The key test: with long stack support, Q should concatenate stack traces
      // The stack should contain "From previous event:" separator which Q adds
      // when it successfully processes stack frames
      const stack = (capturedError as Error).stack as string;
      
      // Q's long stack trace should have processed and included the "From previous event:" marker
      // This only works if Q can correctly identify and filter its own internal frames,
      // which requires the regex to match lines with multi-digit column numbers
      expect(stack).toContain("From previous event:");
    } finally {
      Q.longStackSupport = false;
    }
  });
});