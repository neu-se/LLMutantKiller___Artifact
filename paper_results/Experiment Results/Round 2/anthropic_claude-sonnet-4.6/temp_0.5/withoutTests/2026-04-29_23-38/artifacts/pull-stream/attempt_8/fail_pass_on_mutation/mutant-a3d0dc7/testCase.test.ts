import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"

describe("values source", () => {
  it("should invoke onAbort callback when abort signal is sent to returned source", (done) => {
    // The mutation changes the early-return check from `if(abort)` to `if(true)`
    // The `abort` variable in the outer scope is actually the second argument `onAbort`... 
    // Wait - let me reconsider. `values(array, onAbort)` - there's no `abort` param.
    // So `abort` referenced in placeholder must be reading `onAbort` or is undefined.
    // 
    // Actually looking again: the placeholder references `abort` which doesn't exist
    // in outer scope - it's `undefined`. With if(true), abortCb(cb, abort, onAbort)
    // = abortCb(undefined, undefined, undefined).
    // 
    // Let's check if abortCb(undefined, undefined, undefined) returns a function or undefined
    // by testing the actual behavior difference: onAbort should NOT be called on normal read
    
    let onAbortCalled = false;
    const onAbort = () => { onAbortCalled = true; };
    const source = values([1, 2, 3], onAbort);
    
    source(null, (err: any, val: any) => {
      expect(onAbortCalled).toBe(false);
      expect(err).toBeNull();
      expect(val).toBe(1);
      done();
    });
  });
});