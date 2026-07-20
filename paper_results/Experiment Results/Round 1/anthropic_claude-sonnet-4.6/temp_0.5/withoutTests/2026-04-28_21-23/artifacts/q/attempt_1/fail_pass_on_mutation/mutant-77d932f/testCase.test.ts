import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber stack trace functionality", () => {
  it("should properly extend stack traces when longStackSupport is enabled", async () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      let capturedError: Error | null = null;

      await new Promise<void>((resolve) => {
        const deferred = Q.defer();

        deferred.promise.fail((err: Error) => {
          capturedError = err;
          resolve();
        });

        // Create a rejection in a separate async context
        Q.nextTick(function outerFunction() {
          deferred.reject(new Error("test rejection"));
        });
      });

      // With original code: getFileNameAndLineNumber works, so isInternalFrame
      // can identify Q's own frames, and stack traces get filtered/extended
      // With mutated code: getFileNameAndLineNumber returns undefined,
      // so captureLine() returns undefined at module load,
      // meaning qStartingLine is undefined
      
      // The key difference: with working getFileNameAndLineNumber,
      // the promise.stack gets set (since captureLine returns a number),
      // enabling stack trace concatenation.
      // With mutated code, captureLine returns undefined, so qStartingLine
      // is undefined, and the stack trace extension still happens but
      // isInternalFrame comparisons with undefined behave differently.
      
      // Most directly: check that the error has a stack (it should in both cases)
      // but with longStackSupport, the stack should contain the STACK_JUMP_SEPARATOR
      // only when the promise had a .stack property set (which requires captureLine to work)
      
      expect(capturedError).not.toBeNull();
      expect(capturedError!.stack).toBeDefined();
      
      // With original code: captureLine() returns a line number, so qStartingLine
      // is a number. The deferred promise gets a .stack set.
      // makeStackTraceLong checks promise.stack - if it exists, it concatenates.
      // With mutated code: captureLine() returns undefined, qStartingLine = undefined.
      // The deferred promise still gets .stack set (that's independent of getFileNameAndLineNumber).
      // But filterStackString uses isInternalFrame which uses getFileNameAndLineNumber.
      
      // Actually the stack concatenation with "From previous event:" separator
      // is the key observable behavior when longStackSupport is true
      const stackHasSeparator = capturedError!.stack!.includes("From previous event:");
      expect(stackHasSeparator).toBe(true);
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});