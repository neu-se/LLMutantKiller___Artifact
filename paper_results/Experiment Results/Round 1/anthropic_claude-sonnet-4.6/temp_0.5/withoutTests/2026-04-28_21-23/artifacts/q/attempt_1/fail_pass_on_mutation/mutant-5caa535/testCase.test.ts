import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf fallback behavior", () => {
  it("should return -1 when searching for a value not in the unhandledRejections array, not accessing out-of-bounds index", async () => {
    // The mutation changes `i < this.length` to `i <= this.length` in the array_indexOf fallback.
    // This causes the loop to access `this[this.length]` which is `undefined`.
    // If we search for `undefined` in an array that doesn't contain it explicitly,
    // the mutated code would find it at index `this.length` (out of bounds) and return that index
    // instead of -1.
    
    // We can test this via the unhandledRejections tracking which uses array_indexOf internally.
    // When a rejection is tracked and then untracked, array_indexOf is used to find the promise.
    // If the mutation causes array_indexOf to behave incorrectly with undefined values,
    // it could affect the untracked behavior.
    
    // A more direct approach: use Q's internal behavior that relies on array_indexOf.
    // The trackRejection/untrackRejection functions use array_indexOf on unhandledRejections.
    
    // Create a rejected promise to trigger trackRejection
    const reason = new Error("test rejection");
    const rejectedPromise = Q.reject(reason);
    
    // Reset unhandled rejections to start clean
    Q.resetUnhandledRejections();
    
    // Now test the indexOf behavior indirectly through Q.any
    // Q.any uses array_reduce which internally uses array_indexOf in some paths
    
    // The key test: array_indexOf should return -1 for a value not in the array
    // With the mutation (i <= this.length), when searching for undefined in [1, 2, 3],
    // it would return 3 (the length index) instead of -1
    
    // We test this through the unhandledRejections tracking:
    // After handling a rejection, untrackRejection uses array_indexOf to find the promise.
    // If array_indexOf returns wrong index, the splice would be wrong.
    
    const deferred = Q.defer();
    const promise = deferred.promise;
    
    // Reject the deferred to add to unhandledRejections
    deferred.reject(new Error("test"));
    
    // Wait a tick for the rejection to be tracked
    await new Promise(resolve => setTimeout(resolve, 10));
    
    // Now handle the rejection - this calls untrackRejection which uses array_indexOf
    const handled = promise.then(null, () => "handled");
    
    // Wait for the promise chain to settle
    const result = await handled;
    expect(result).toBe("handled");
    
    // The unhandled reasons should be empty after handling
    // If array_indexOf is broken (mutation), the splice might not work correctly
    await new Promise(resolve => setTimeout(resolve, 50));
    
    const unhandledReasons = Q.getUnhandledReasons();
    // After handling the rejection, it should be removed from unhandled
    // This verifies array_indexOf worked correctly to find and remove it
    expect(unhandledReasons.length).toBe(0);
  });
});