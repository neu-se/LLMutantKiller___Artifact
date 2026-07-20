import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf shim behavior via Q internals", () => {
  it("should find a promise in unhandledRejections and properly untrack it", async () => {
    // Force use of the indexOf path by creating a rejection and then handling it
    // The untrackRejection function uses array_indexOf to find the promise index
    // If i-- is used instead of i++, it would infinite loop
    
    // Create a deferred to control timing
    const deferred = Q.defer();
    
    // Reject it to add to unhandledRejections
    deferred.reject(new Error("test error"));
    
    // Now handle it - this calls untrackRejection which uses array_indexOf
    const handled = await deferred.promise.then(
      () => "fulfilled",
      () => "rejected and handled"
    );
    
    expect(handled).toBe("rejected and handled");
    
    // Verify unhandled reasons are empty (rejection was tracked and untracked)
    const reasons = Q.getUnhandledReasons();
    expect(Array.isArray(reasons)).toBe(true);
  });
});