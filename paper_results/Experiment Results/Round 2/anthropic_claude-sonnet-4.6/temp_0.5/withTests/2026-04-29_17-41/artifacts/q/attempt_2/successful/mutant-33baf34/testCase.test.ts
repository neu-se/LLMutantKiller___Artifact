import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber named function parsing", () => {
  it("filters q.js frames from long stack traces", async () => {
    Q.longStackSupport = true;

    const deferred = Q.defer();
    
    // Create a chain so makeStackTraceLong gets invoked
    const chainedPromise = deferred.promise.then(null, function passThrough(err: any) {
      return Q.reject(err);
    });

    deferred.reject(new Error("test"));

    let capturedError: any = null;
    try {
      await chainedPromise;
    } catch (err) {
      capturedError = err;
    } finally {
      Q.longStackSupport = false;
    }

    expect(capturedError).not.toBeNull();
    const stack: string = capturedError.stack;
    // With correct code: q.js frames are filtered out by isInternalFrame
    // With mutation: getFileNameAndLineNumber returns undefined for named frames,
    //   so captureLine returns undefined, qFileName is never set,
    //   isInternalFrame always returns false, q.js frames appear in stack
    const stackLines = stack.split("\n");
    const qLines = stackLines.filter((line: string) => line.includes("q.js"));
    expect(qLines.length).toBe(0);
  });
});