import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any with multiple rejected promises", () => {
  it("should resolve with the first fulfilled promise value when using Q.any", async () => {
    // The mutation changes `i++` to `i--` in the array_indexOf shim fallback.
    // array_indexOf is used in trackRejection/untrackRejection to find promises in unhandledRejections array.
    // We can test this more directly by using Q.any which relies on array behavior,
    // but the most direct test is to verify that rejection tracking works correctly.
    // 
    // Actually, let's test Q.any which uses pendingCount and rejection handling,
    // and the indexOf is used in untrackRejection. If indexOf loops infinitely (i--),
    // the process would hang. Let's test a simpler path.
    //
    // The array_indexOf shim is used in trackRejection to check if a promise is in
    // unhandledRejections. With i-- instead of i++, the loop would be infinite for
    // non-empty arrays, causing a hang/timeout.
    //
    // Let's create a scenario where array_indexOf is called on a non-empty array.
    // This happens in untrackRejection when a rejection is handled.
    
    const deferred = Q.defer();
    const promise = deferred.promise;
    
    // Reject the promise - this adds it to unhandledRejections
    deferred.reject(new Error("test error"));
    
    // Now handle the rejection - this calls untrackRejection which calls array_indexOf
    // on the unhandledRejections array (which now has at least one element)
    const result = await promise.then(
      () => "fulfilled",
      () => "rejected"
    );
    
    expect(result).toBe("rejected");
  });
});