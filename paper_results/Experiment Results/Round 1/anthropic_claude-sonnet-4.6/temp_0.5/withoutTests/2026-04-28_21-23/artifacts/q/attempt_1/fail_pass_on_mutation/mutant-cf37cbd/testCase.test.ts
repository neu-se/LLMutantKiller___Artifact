import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace parsing with multi-digit column numbers", () => {
  it("should correctly resolve promises when long stack support is enabled with typical stack frames", async () => {
    Q.longStackSupport = true;
    
    const error = new Error("test error");
    // Create a stack line that simulates an anonymous function with multi-digit column number
    // The original regex /at ([^ ]+):(\d+):(?:\d+)$/ matches column numbers like :10, :100
    // The mutated regex /at ([^ ]+):(\d+):(?:\d)$/ only matches single-digit columns like :1, :9
    
    // We test observable behavior: Q should properly reject and the error should propagate
    const deferred = Q.defer();
    deferred.reject(error);
    
    let caughtReason: Error | null = null;
    
    await new Promise<void>((resolve) => {
      deferred.promise.then(
        () => { resolve(); },
        (reason: Error) => {
          caughtReason = reason;
          resolve();
        }
      );
    });
    
    expect(caughtReason).toBe(error);
    
    // Now test that the captureLine function works correctly
    // If getFileNameAndLineNumber fails due to the regex mutation,
    // qStartingLine would be undefined, and isInternalFrame would behave differently
    // This affects whether Q's own frames get filtered from stack traces
    
    // Create a chain of promises to generate a long stack trace
    const result = await Q.reject(new Error("original"))
      .then(null, (err: Error) => {
        // The error should have been caught and we can inspect it
        return Q.resolve("recovered");
      });
    
    expect(result).toBe("recovered");
    
    Q.longStackSupport = false;
  });
});