import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress callback error propagation", () => {
  it("should throw when progress callback throws and Q.onerror is not set", (done) => {
    const deferred = Q.defer();
    const error = new Error("progress error");
    
    // Ensure Q.onerror is not set
    const originalOnerror = Q.onerror;
    Q.onerror = undefined;
    
    let caughtError: Error | null = null;
    
    deferred.promise.then(
      null,
      null,
      function progressCallback(value: any) {
        throw error;
      }
    );
    
    // The throw should propagate - in original code it throws, in mutated it doesn't
    try {
      deferred.notify("progress");
      // If we get here without error in synchronous context, check async
    } catch (e) {
      caughtError = e as Error;
    }
    
    Q.onerror = originalOnerror;
    
    expect(caughtError).toBe(error);
    done();
  });
});