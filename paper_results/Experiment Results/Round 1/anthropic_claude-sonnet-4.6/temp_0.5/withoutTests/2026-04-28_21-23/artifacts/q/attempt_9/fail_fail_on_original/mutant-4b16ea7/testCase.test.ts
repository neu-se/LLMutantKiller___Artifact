describe("Q setImmediate branch detection", () => {
  it("original uses setImmediate.bind(window, flush) capturing value at load time", (done) => {
    const origNextTick = process.nextTick;
    (process as any).nextTick = undefined;
    jest.resetModules();

    const origSetImmediate = (global as any).setImmediate;
    let loadTimeCalled = false;
    let callTimeCalled = false;
    
    // Replace setImmediate BEFORE loading module
    const mockSetImmediate = function(fn: any) {
      loadTimeCalled = true;
      return origSetImmediate(fn);
    };
    (global as any).setImmediate = mockSetImmediate;

    import("../../../../../../../../../../../subject_repositories/q/q.js").then((mod: any) => {
      process.nextTick = origNextTick;
      const Q = mod.default || mod;
      
      // Now replace setImmediate AGAIN after load
      (global as any).setImmediate = function(fn: any) {
        callTimeCalled = true;
        return origSetImmediate(fn);
      };
      
      loadTimeCalled = false; // reset
      
      Q.nextTick(() => {
        (global as any).setImmediate = origSetImmediate;
        // Original: bound to mockSetImmediate at load time
        //   → loadTimeCalled would be true (old mock called), callTimeCalled false
        // Mutant: wrapper calls current setImmediate at call time
        //   → callTimeCalled would be true (new mock called), loadTimeCalled false
        expect(callTimeCalled).toBe(false);
        done();
      });
    });
  });
});