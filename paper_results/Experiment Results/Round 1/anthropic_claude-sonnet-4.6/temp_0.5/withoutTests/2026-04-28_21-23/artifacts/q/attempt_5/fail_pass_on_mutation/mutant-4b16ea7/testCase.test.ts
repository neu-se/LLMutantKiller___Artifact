describe("Q setImmediate branch with window defined", () => {
  it("should use setImmediate.bind(window, flush) when window is defined", (done) => {
    const originalNextTick = process.nextTick;
    // Temporarily remove process.nextTick to force setImmediate branch
    (process as any).nextTick = undefined;
    
    jest.resetModules();
    
    import("../../../../../../../../../../../subject_repositories/q/q.js").then((Q: any) => {
      // Restore process.nextTick
      process.nextTick = originalNextTick;
      
      const contexts: any[] = [];
      const orig = (global as any).setImmediate;
      (global as any).setImmediate = function(this: any, ...args: any[]) {
        contexts.push(this);
        return orig.apply(orig, args);
      };
      
      Q.default.nextTick(() => {
        (global as any).setImmediate = orig;
        // Original: setImmediate.bind(window, flush) -> this === window
        // Mutant: setImmediate(flush) in wrapper -> this !== window
        expect(contexts[0]).toBe((global as any).window);
        done();
      });
    });
  });
});