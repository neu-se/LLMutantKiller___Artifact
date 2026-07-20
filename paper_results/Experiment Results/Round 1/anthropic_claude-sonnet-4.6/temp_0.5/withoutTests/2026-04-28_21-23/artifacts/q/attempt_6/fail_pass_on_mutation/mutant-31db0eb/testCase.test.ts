describe("Q", () => {
  it("should use setTimeout fallback when window is defined but setImmediate is not a function", (done) => {
    const origSetImmediate = (global as any).setImmediate;
    delete (global as any).setImmediate;
    // Define window to trigger the branch
    (global as any).window = global;
    
    let Q: any = null;
    jest.isolateModules(() => {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    });
    
    delete (global as any).window;
    (global as any).setImmediate = origSetImmediate;
    
    // If requestTick was set correctly, this should work
    Q(42).then((val: number) => {
      expect(val).toBe(42);
      done();
    });
  });
});