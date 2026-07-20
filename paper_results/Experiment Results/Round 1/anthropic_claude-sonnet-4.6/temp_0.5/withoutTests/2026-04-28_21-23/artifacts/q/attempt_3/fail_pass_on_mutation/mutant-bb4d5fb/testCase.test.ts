import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace filtering - isInternalFrame", () => {
  it("should not filter frames from non-Q files when building long stack traces", async () => {
    Q.longStackSupport = true;

    // Create a chain that will produce a long stack trace
    const deferred = Q.defer();
    
    function rejectWithError() {
      const err = new Error("test error from user code");
      deferred.reject(err);
    }
    
    rejectWithError();
    
    let capturedError: any;
    await new Promise<void>((resolve) => {
      deferred.promise.fail((err: any) => {
        capturedError = err;
        resolve();
      });
    });
    
    // The stack should contain frames from this test file (rejectWithError function)
    // With mutation: frames from non-Q files get filtered because lineNumber <= qEndingLine
    // qEndingLine is large (q.js is ~1000+ lines), so virtually all frames get filtered
    expect(capturedError.stack).toContain("rejectWithError");
  });
});