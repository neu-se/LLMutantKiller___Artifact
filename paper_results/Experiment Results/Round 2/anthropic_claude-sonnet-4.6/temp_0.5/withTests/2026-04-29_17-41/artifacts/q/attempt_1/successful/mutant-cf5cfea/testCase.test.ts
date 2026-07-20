import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("coerce", () => {
  it("should reject the promise when a thenable's then method throws an exception", (done) => {
    const thrownError = new Error("thenable then threw");
    
    // Create a thenable whose `then` method throws synchronously
    const badThenable = {
      then: function() {
        throw thrownError;
      }
    };
    
    // Q will try to coerce this thenable via the `coerce` function
    const promise = Q(badThenable);
    
    promise.then(
      function() {
        done(new Error("Expected promise to be rejected, but it was fulfilled"));
      },
      function(reason: unknown) {
        expect(reason).toBe(thrownError);
        done();
      }
    );
    
    // If the promise stays pending (mutated code), this timeout will trigger
    setTimeout(function() {
      if (promise.isPending()) {
        done(new Error("Promise is still pending - exception was swallowed"));
      }
    }, 500);
  });
});