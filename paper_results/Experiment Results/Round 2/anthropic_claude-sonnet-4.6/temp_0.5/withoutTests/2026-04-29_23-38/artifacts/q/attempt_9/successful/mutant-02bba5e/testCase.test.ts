import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
  it("handles null rejection reason when longStackSupport is enabled", async () => {
    Q.longStackSupport = true;
    
    const deferred = Q.defer();
    // deferred.promise has .stack set because longStackSupport=true
    
    let caught: any = "NOT_CALLED";
    
    // deferred.promise has .stack
    // When we reject with null and handle it:
    // _rejected(null) is called, makeStackTraceLong(null, deferred.promise) is called
    // Original: hasStacks && promise.stack is TRUE, but then error !== null is FALSE
    //           Wait - the condition is AND not OR for promise.stack!
    //           hasStacks && promise.stack && typeof error === "object" && error !== null && error.stack
    //           = true && stack && true && false && ... = false → body skipped
    // Mutated:  true && stack && true && true && null.stack → TypeError!
    
    const p = deferred.promise.then(undefined, (e: any) => {
      caught = e;
    });
    
    deferred.reject(null);
    await p;
    
    expect(caught).toBeNull();
  });
});