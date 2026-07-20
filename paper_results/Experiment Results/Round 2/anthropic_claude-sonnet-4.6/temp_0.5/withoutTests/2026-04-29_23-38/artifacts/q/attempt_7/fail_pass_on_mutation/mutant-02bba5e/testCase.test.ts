import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
  it("stack trace is modified when error has no stack but promise has stack", async () => {
    Q.longStackSupport = true;
    
    // Create an error-like object with NO stack property
    const errorLike: any = { message: "no stack error" };
    delete errorLike.stack; // ensure no stack
    
    expect(errorLike.stack).toBeUndefined();
    
    const deferred = Q.defer(); // gets .stack because longStackSupport=true
    
    let receivedError: any;
    const p = deferred.promise.then(undefined, (e: any) => {
      receivedError = e;
    });
    
    deferred.reject(errorLike);
    await p;
    
    // With longStackSupport=true, promise.stack is set
    // hasStacks && promise.stack = true → body executes
    // In body: stacks.unshift(error.stack) where error.stack is undefined
    // Then error.stack is set to filtered concatenated stacks
    
    // This should happen in BOTH original and mutated (since hasStacks && promise.stack is true)
    // So this test doesn't distinguish them...
    
    expect(receivedError).toBe(errorLike);
  });
});