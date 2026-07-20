import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber named function frame parsing", () => {
  it("should filter Q internal frames from long stack traces", async () => {
    Q.longStackSupport = true;

    let errorStack: string | undefined;

    const deferred = Q.defer();
    deferred.reject(new Error("test error"));

    await deferred.promise.then(null, function(err: Error) {
      errorStack = err.stack;
    });

    Q.longStackSupport = false;

    expect(errorStack).toBeDefined();
    // Q internal frames should be filtered out - "promiseDispatch" is an internal Q function
    // With the mutation, isInternalFrame fails, so internal frames won't be filtered
    // But more importantly, captureLine fails, so qFileName is undefined
    // This means isInternalFrame always returns false
    // The observable difference: Q internal function names appear in the stack
    expect(errorStack).not.toContain("promiseDispatch");
  });
});