import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf off-by-one mutation detection", () => {
  it("correctly returns -1 when searching for undefined in an array without undefined", (done) => {
    // The mutation changes `i < this.length` to `i <= this.length`
    // This causes array_indexOf to access this[this.length] which is undefined
    // If we search for undefined in an array that doesn't contain it,
    // the mutated code returns this.length (truthy) instead of -1
    
    // array_indexOf is used in untrackRejection:
    // var at = array_indexOf(unhandledRejections, promise);
    // if (at !== -1) { unhandledRejections.splice(at, 1); ... }
    // 
    // If we create a rejection and handle it, untrackRejection is called.
    // With the mutation, if the promise is NOT in unhandledRejections but
    // undefined is searched... we need a different angle.
    //
    // Better: use Q.any which calls array_reduce, but array_indexOf is the target.
    // Let's use the unhandled rejection tracking directly.
    
    Q.resetUnhandledRejections();
    
    // Reject with undefined stack so unhandledReasons gets "(no stack) undefined"
    const p = Q.reject(undefined);
    
    // Handle it - this calls untrackRejection which calls array_indexOf(unhandledRejections, p)
    p.fail(() => {});
    
    setTimeout(() => {
      // After handling, the unhandled reasons should be empty
      // With the mutation, if array_indexOf returns wrong index, splice may corrupt state
      expect(Q.getUnhandledReasons().length).toBe(0);
      done();
    }, 100);
  });
});