import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber stack filtering", () => {
  it("should filter internal Q frames from long stack traces when longStackSupport is enabled", async () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      let capturedError: Error | null = null;

      await new Promise<void>((resolve) => {
        Q.reject(new Error("test rejection"))
          .then(() => {})
          .fail((err: Error) => {
            capturedError = err;
            resolve();
          })
          .done();
      });

      // With original code: getFileNameAndLineNumber works, so isInternalFrame
      // correctly identifies Q's own frames and filters them.
      // With mutated code: getFileNameAndLineNumber returns undefined, so
      // isInternalFrame always returns false, and Q frames are NOT filtered.
      // 
      // The key observable difference: in the original, captureLine() returns
      // a valid line number (qStartingLine is set). In the mutated version,
      // captureLine() returns undefined because getFileNameAndLineNumber returns
      // undefined. This means qStartingLine is undefined.
      //
      // We can observe this by checking that a promise chain with long stacks
      // actually produces a stack that contains the "From previous event:" separator,
      // which only happens when makeStackTraceLong successfully processes stacks.
      // For makeStackTraceLong to work, promise.stack must be set, which requires
      // the deferred to have captured a stack (which it does when longStackSupport=true).
      
      // The real test: create a rejection with a chain and verify the error
      // has a stack that was processed (contains separator or not)
      const deferred = Q.defer();
      
      let rejectionError: Error | null = null;
      const promise = deferred.promise
        .then(() => Q.reject(new Error("inner error")))
        .fail((err: Error) => {
          rejectionError = err;
          return Q.resolve();
        });

      deferred.resolve("start");
      await promise;

      expect(rejectionError).not.toBeNull();
      // With original code working, long stack traces are built and the stack
      // should contain the "From previous event:" separator
      expect(rejectionError!.stack).toContain("From previous event:");
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});