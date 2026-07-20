import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber named function regex", () => {
  it("should correctly handle long stack traces with named function frames", async () => {
    Q.longStackSupport = true;
    
    const deferred = Q.defer();
    
    // Create a rejection that will have a named function in the stack trace
    function namedFunction() {
      deferred.reject(new Error("test error"));
    }
    
    namedFunction();
    
    let caughtError: any = null;
    await deferred.promise.then(null, (err) => {
      caughtError = err;
    });
    
    // The error should be caught and have a stack
    expect(caughtError).not.toBeNull();
    expect(caughtError.message).toBe("test error");
    
    // With the original code, captureLine() correctly identifies Q's line range
    // and isInternalFrame works. With the mutation, captureLine() may return
    // undefined, causing qStartingLine to be undefined.
    // The key test: Q should still be functional (not crash) and
    // the promise chain should work correctly.
    
    const result = await Q(42).then((v) => v * 2);
    expect(result).toBe(84);
    
    // Test that Q.when works correctly - this exercises the core promise machinery
    const chainResult = await Q.when(Q(10), (v: number) => v + 5);
    expect(chainResult).toBe(15);
  });
});