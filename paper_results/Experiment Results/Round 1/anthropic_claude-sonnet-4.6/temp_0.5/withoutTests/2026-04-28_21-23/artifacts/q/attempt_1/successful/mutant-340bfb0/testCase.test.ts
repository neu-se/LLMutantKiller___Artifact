import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack trace __minimumStackCounter__ property", () => {
  it("should set __minimumStackCounter__ on error objects when building long stack traces", async () => {
    Q.longStackSupport = true;

    const error = new Error("test error");
    
    // Create a chain of promises that will trigger makeStackTraceLong
    const deferred = Q.defer();
    
    let capturedError: any = null;
    
    const promise = deferred.promise.then(null, function(err) {
      capturedError = err;
      // After rejection handling, the error should have __minimumStackCounter__ set
      return Q.resolve("handled");
    });
    
    deferred.reject(error);
    
    await promise;
    
    // The error should have __minimumStackCounter__ set (not "")
    // With the mutation, it's stored as "" so __minimumStackCounter__ would be undefined
    expect(capturedError).toBe(error);
    expect(capturedError.__minimumStackCounter__).toBeDefined();
    expect(typeof capturedError.__minimumStackCounter__).toBe("number");
    
    Q.longStackSupport = false;
  });
});