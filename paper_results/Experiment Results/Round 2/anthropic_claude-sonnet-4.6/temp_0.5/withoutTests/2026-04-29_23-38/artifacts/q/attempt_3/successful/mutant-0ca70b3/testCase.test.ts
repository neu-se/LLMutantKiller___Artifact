import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
  it("should set error stack to non-empty string after filtering", async () => {
    Q.longStackSupport = true;

    // Create a deferred - this will capture a stack on the promise since longStackSupport is on
    const deferred = Q.defer();
    
    let capturedStack: string | undefined;
    
    const promise = deferred.promise.then(null, function(err: Error) {
      capturedStack = err.stack;
    });
    
    // Reject with an error that has a stack
    const error = new Error("test error");
    deferred.reject(error);
    
    await promise;
    
    // Original: filterStackString iterates lines, returns non-empty filtered stack
    // Mutated: filterStackString returns "", so error.stack becomes ""
    expect(capturedStack).not.toBe("");
    expect(capturedStack).toBeDefined();
    expect(capturedStack!.length).toBeGreaterThan(0);
  });
});