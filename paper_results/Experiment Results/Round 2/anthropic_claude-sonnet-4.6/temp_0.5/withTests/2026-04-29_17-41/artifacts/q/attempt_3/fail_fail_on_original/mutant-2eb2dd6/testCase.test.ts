import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deferred promise resolution", () => {
  it("should invoke then-handlers registered before resolution", (done) => {
    const deferred = Q.defer();
    
    // Register the then-handler BEFORE resolving (so message gets queued)
    deferred.promise.then((value: number) => {
      expect(value).toBe(42);
      done();
    }, () => {
      done.fail("should not reject");
    });

    // Resolve after registering - this triggers become() which uses array_reduce
    // to dispatch queued messages. With the mutation, array_reduce's callback
    // never runs, so messages are never dispatched and done() is never called.
    deferred.resolve(42);
    
    // Timeout to detect if done() was never called
    setTimeout(() => {
      done.fail("promise handler was never called - array_reduce is broken");
    }, 500);
  });
});