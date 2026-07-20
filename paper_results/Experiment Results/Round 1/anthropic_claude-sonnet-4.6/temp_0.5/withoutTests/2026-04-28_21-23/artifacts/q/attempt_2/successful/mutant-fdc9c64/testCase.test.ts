import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame operator precedence", () => {
  it("does not filter frames from external files when long stack support is enabled", async () => {
    Q.longStackSupport = true;

    let capturedError: Error | null = null;

    // We need makeStackTraceLong to be called, which happens in _rejected
    // when Q.longStackSupport is true and the promise has a stack
    const deferred = Q.defer();
    
    // Reject with an error that has a stack trace containing frames from this file
    function userFunction() {
      deferred.reject(new Error("user-error"));
    }
    userFunction();

    await deferred.promise.then(null, function captureRejection(err: Error) {
      capturedError = err;
    });

    Q.longStackSupport = false;

    expect(capturedError).not.toBeNull();
    const stack = (capturedError as Error).stack || "";
    
    // "userFunction" is defined in this test file at a small line number
    // Original: only Q's own frames are filtered, "userFunction" frame is preserved
    // Mutated: any frame with lineNumber <= qEndingLine is filtered, which includes
    //          "userFunction" since this test file is much shorter than q.js
    expect(stack).toContain("userFunction");
  });
});