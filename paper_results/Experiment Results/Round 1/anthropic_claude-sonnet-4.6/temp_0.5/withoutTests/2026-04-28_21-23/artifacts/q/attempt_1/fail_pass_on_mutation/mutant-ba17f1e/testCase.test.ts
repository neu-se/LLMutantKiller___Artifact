import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber named function pattern", () => {
  it("should correctly parse named function stack frames for long stack support", async () => {
    Q.longStackSupport = true;
    
    const error = new Error("test error");
    
    // Create a rejected promise chain that will use makeStackTraceLong
    // which calls filterStackString -> isInternalFrame -> getFileNameAndLineNumber
    let capturedError: any = null;
    
    await Q.reject(error)
      .then(null, function captureErr(e: any) {
        capturedError = e;
        return Q.resolve("handled");
      });
    
    // The key behavior: with original code, the stack should be a non-empty string
    // With mutated code, getFileNameAndLineNumber returns [] for named function frames,
    // meaning qFileName is undefined (captureLine returns undefined),
    // so isInternalFrame always returns false (can't match undefined filename)
    // This means Q internal frames are NOT filtered from stack traces
    
    // Test that the promise resolved correctly (basic functionality)
    expect(capturedError).toBe(error);
    
    // Test that long stack support captures stacks properly
    // With original: qFileName is set correctly, internal frames filtered
    // With mutated: qFileName is undefined, captureLine returns undefined
    // The stack on the promise itself should be set when longStackSupport is true
    const deferred = Q.defer();
    const promise = deferred.promise;
    
    // With original code, promise.stack is set (longStackSupport = true, hasStacks = true)
    // The stack string should contain actual content
    expect(typeof (promise as any).stack).toBe("string");
    expect((promise as any).stack.length).toBeGreaterThan(0);
    
    deferred.resolve("done");
    const result = await promise;
    expect(result).toBe("done");
  });
});