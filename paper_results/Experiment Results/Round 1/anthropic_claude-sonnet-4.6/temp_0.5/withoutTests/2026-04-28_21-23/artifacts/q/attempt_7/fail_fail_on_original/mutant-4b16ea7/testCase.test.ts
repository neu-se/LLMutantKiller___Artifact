describe("Q setImmediate capture timing", () => {
  it("original captures setImmediate at load time via bind", (done) => {
    const origNextTick = process.nextTick;
    (process as any).nextTick = undefined;
    jest.resetModules();

    const origSetImmediate = (global as any).setImmediate;
    
    import("../../../../../../../../../../../subject_repositories/q/q.js").then((mod: any) => {
      process.nextTick = origNextTick;
      const Q = mod.default || mod;
      
      // Replace setImmediate AFTER module load
      // Original: requestTick already bound to old setImmediate → old one called
      // Mutant: requestTick wrapper references setImmediate by name → new one called
      let newSetImmediateCalled = false;
      (global as any).setImmediate = function(fn: any) {
        newSetImmediateCalled = true;
        return origSetImmediate(fn);
      };
      
      Q.nextTick(() => {
        (global as any).setImmediate = origSetImmediate;
        // Original: old setImmediate was used (bound at load), new one NOT called
        // Mutant: new setImmediate IS called
        expect(newSetImmediateCalled).toBe(false);
        done();
      });
    });
  });
});