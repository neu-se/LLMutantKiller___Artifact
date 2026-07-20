import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf behavior", () => {
  it("should not find an element at an out-of-bounds index when searching in Q.all", async () => {
    // The mutation changes `i < this.length` to `i <= this.length`
    // This means the fallback indexOf would check index `this.length` which is undefined
    // We can expose this by testing that Q's internal array_indexOf works correctly
    // by using Q.any which relies on array_reduce which uses array_indexOf indirectly
    // 
    // More directly: the mutation causes array_indexOf to access arr[arr.length] 
    // which is undefined. If we search for undefined in an array that doesn't contain it,
    // the mutated code would return arr.length (an out-of-bounds index) instead of -1.
    //
    // This affects trackRejection/untrackRejection which use array_indexOf on unhandledRejections.
    // We can test this through Q's unhandled rejection tracking behavior.
    //
    // The simplest approach: test that Q.any returns -1 for missing elements
    // by checking the behavior of rejection tracking.
    //
    // Actually, let's test it through the public API by checking that
    // Q.all properly handles promises - the array_indexOf is used in untrackRejection
    // to find promises in unhandledRejections array.
    //
    // The key insight: with the mutation, array_indexOf(arr, undefined) would return
    // arr.length instead of -1 when undefined is not in the array.
    // This would cause untrackRejection to incorrectly find a promise at index arr.length
    // and try to splice it, which would fail silently but the splice at out-of-bounds
    // wouldn't actually remove anything meaningful.
    //
    // Let's test via the getUnhandledReasons API:
    
    Q.resetUnhandledRejections();
    
    // Create a rejected promise and then handle it
    const reason = new Error("test rejection");
    const rejectedPromise = Q.reject(reason);
    
    // Handle the rejection immediately
    const handledPromise = rejectedPromise.then(null, function(err) {
      return "handled: " + err.message;
    });
    
    const result = await handledPromise;
    expect(result).toBe("handled: test rejection");
    
    // Wait for async operations to complete
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // The unhandled reasons should be empty since we handled the rejection
    const unhandledReasons = Q.getUnhandledReasons();
    expect(unhandledReasons.length).toBe(0);
  });
});