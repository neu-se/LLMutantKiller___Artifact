import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q threw mutation - final attempt", () => {
  it("detects mutation by triggering the catch block and observing different behavior", async () => {
    // The function with threw takes (promise, callback)
    // We need to trigger the catch block
    
    // Hypothesis: the function validates callback and throws if invalid
    // With threw=true (original): finally block returns rejection
    // With threw=false (mutated): finally block doesn't return, falls through
    
    // Test with Q.tap static if it exists
    const Q_any = Q as any;
    
    if (typeof Q_any.tap !== "function") {
      // Q.tap doesn't exist, the method might be Promise.prototype.tapCatch
      // or it might be an internal method
      
      // Test the behavior of tap with a thenable callback that throws
      const badThenable = {
        then: function(onFulfilled: Function) {
          // Call onFulfilled with a function that throws
          onFulfilled(function() {
            throw new Error("function threw");
          });
        }
      };
      
      let result: unknown = undefined;
      let error: unknown = undefined;
      
      await Q.resolve(42)
        .tap(badThenable as any)
        .then(
          (val: unknown) => { result = val; },
          (err: unknown) => { error = err; }
        );
      
      // When the callback (resolved from thenable) throws, should reject
      expect(error).toBeDefined();
      return;
    }
    
    // Q.tap exists, test it
    let result: unknown = undefined;
    let error: unknown = undefined;
    
    await Q_any.tap(Q.resolve(42), function() {
      throw new Error("callback threw");
    })
    .then(
      (val: unknown) => { result = val; },
      (err: unknown) => { error = err; }
    );
    
    expect(error).toBeDefined();
    expect(result).toBeUndefined();
  });
});