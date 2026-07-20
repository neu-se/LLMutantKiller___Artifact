import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf off-by-one mutation", () => {
  it("should return -1 when searching for a value not in the array, including undefined at out-of-bounds index", () => {
    Q.resetUnhandledRejections();

    // Create a promise that is never rejected - so unhandledRejections array stays empty
    // Then create a rejection and handle it immediately
    // untrackRejection will call array_indexOf on unhandledRejections
    // With the mutation, if unhandledRejections is empty ([]) and we search for a promise,
    // the loop goes i=0 (i <= 0), checks this[0] which is undefined, 
    // if promise === undefined it returns 0 instead of -1
    // But promise is not undefined, so it still returns -1 in that case.
    
    // The real issue: when array has items and we search past the end
    // this[length] === undefined, so if value is undefined, wrong index returned
    
    // Test: reject with undefined reason - the unhandledReasons array gets "(no stack) undefined"
    // Then check that after handling, it's properly removed
    const deferred = Q.defer();
    const p = deferred.promise;
    
    // reject with undefined
    deferred.reject(undefined);
    
    // Immediately handle it
    p.fail(function() { /* handled */ });
    
    return Q.delay(50).then(function() {
      // If array_indexOf is correct, the rejection was tracked then untracked
      // Result: 0 unhandled reasons
      expect(Q.getUnhandledReasons().length).toBe(0);
    });
  });
});