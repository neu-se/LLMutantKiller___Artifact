import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("coerce function error handling", () => {
  it("should reject the promise when a thenable's then method throws an exception", async () => {
    const thrownError = new Error("thenable threw during coercion");
    
    const badThenable = {
      then: function() {
        throw thrownError;
      }
    };
    
    // Q will try to coerce this thenable via the coerce function
    // In the original code, the exception is caught and deferred.reject(exception) is called
    // In the mutated code, the exception is swallowed and the promise stays pending forever
    const promise = Q(badThenable);
    
    let rejectionReason: unknown = null;
    let wasRejected = false;
    
    await promise.then(
      () => {
        // should not fulfill
      },
      (reason: unknown) => {
        wasRejected = true;
        rejectionReason = reason;
      }
    );
    
    expect(wasRejected).toBe(true);
    expect(rejectionReason).toBe(thrownError);
  });
});