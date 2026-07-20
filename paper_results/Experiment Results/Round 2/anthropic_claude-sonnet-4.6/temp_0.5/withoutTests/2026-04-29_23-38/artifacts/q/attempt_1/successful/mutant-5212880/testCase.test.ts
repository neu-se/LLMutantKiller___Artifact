import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done", () => {
  it("should forward to the promise's done method and throw unhandled rejections", async () => {
    // In the original code, Q.done(object, fulfilled, rejected, progress) calls
    // Q(object).done(fulfilled, rejected, progress)
    // In the mutated code, Q.done is a no-op function that does nothing
    
    const fulfilledValues: number[] = [];
    
    // Create a fulfilled promise
    const promise = Q.resolve(42);
    
    // Call Q.done with a fulfilled callback - in original code this should invoke the callback
    // We use a deferred to wait for the async operation
    const deferred = Q.defer();
    
    Q.done(promise, function(value: number) {
      fulfilledValues.push(value);
      deferred.resolve(value);
    });
    
    // Wait for the done callback to be invoked
    await deferred.promise;
    
    // In original code, the fulfilled callback should have been called with 42
    // In mutated code, Q.done is a no-op so fulfilledValues will remain empty
    expect(fulfilledValues).toEqual([42]);
  });
});