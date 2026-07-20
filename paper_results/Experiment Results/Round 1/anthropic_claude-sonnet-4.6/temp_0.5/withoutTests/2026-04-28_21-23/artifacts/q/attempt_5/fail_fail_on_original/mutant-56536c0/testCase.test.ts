describe("Q", () => {
  it("should use setTimeout for flush scheduling when setImmediate available but no window/nodejs", (done) => {
    jest.resetModules();
    
    const originalSetTimeout = global.setTimeout;
    const originalSetImmediate = (global as any).setImmediate;
    const originalProcessNextTick = process.nextTick;
    
    const flushScheduler: string[] = [];
    
    // Disable Node.js path
    (process as any).nextTick = null;
    
    // Track which scheduler is used for flush
    (global as any).setImmediate = function trackSetImmediate(fn: Function) {
      flushScheduler.push("setImmediate");
      // Use real setImmediate to actually run
      return originalSetImmediate(fn);
    };
    
    (global as any).setTimeout = function trackSetTimeout(fn: Function, delay: number) {
      if (delay === 0) flushScheduler.push("setTimeout");
      return originalSetTimeout(fn, delay);
    };
    
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    // Restore process.nextTick so Jest can work
    process.nextTick = originalProcessNextTick;
    
    Q.nextTick(() => {
      // Restore globals
      (global as any).setImmediate = originalSetImmediate;
      (global as any).setTimeout = originalSetTimeout;
      
      // Original code: setImmediate branch taken, then MessageChannel block runs
      // and overwrites with setTimeout -> flushScheduler[0] === "setTimeout"  
      // Wait, but there's no window so setImmediate branch sets requestTick = setImmediate(flush)
      // Then MessageChannel (if available) would set requestTick = MessageChannel-based
      // Then setTimeout overwrites... 
      // Actually the setTimeout IS inside MessageChannel block!
      
      // Original: setImmediate available, no window -> requestTick = setImmediate
      //           then } closes else{}, else if(MessageChannel) { setTimeout } 
      //           MessageChannel exists in Node -> requestTick = setTimeout
      // Mutated:  setImmediate available, no window -> requestTick = setImmediate  
      //           else if(false) skipped -> requestTick stays as setImmediate
      
      expect(flushScheduler[0]).toBe("setTimeout");
      done();
    });
  });
});