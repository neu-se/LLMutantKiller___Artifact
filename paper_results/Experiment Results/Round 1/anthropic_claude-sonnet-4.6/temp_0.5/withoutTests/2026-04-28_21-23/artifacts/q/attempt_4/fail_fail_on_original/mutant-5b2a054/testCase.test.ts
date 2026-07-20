import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick error in browser-like path", () => {
  it("should throw error in setTimeout when task fails in non-node path", (done) => {
    // The mutation removes throw from setTimeout callback in the else branch
    // We can detect this by temporarily making isNodeJS=false via process manipulation
    // But since if(true) hardcodes the node path, we test the observable contract:
    // errors from tasks scheduled via nextTick must eventually surface
    
    const caughtErrors: Error[] = [];
    const testError = new Error("nextTick task error");
    
    // Capture errors thrown in setTimeout callbacks
    const originalSetTimeout = global.setTimeout;
    let timeoutCallbacks: Function[] = [];
    
    (global as any).setTimeout = function(fn: Function, delay: number) {
      if (delay === 0) {
        timeoutCallbacks.push(fn);
      }
      return originalSetTimeout(fn, delay);
    };
    
    Q.nextTick(() => { throw testError; });
    
    // Give time for the setTimeout(flush, 0) to be scheduled
    originalSetTimeout(() => {
      (global as any).setTimeout = originalSetTimeout;
      
      // In original: one of the timeoutCallbacks will throw testError when called
      // In mutated: the callback that would throw is replaced with empty function
      let threw = false;
      for (const cb of timeoutCallbacks) {
        try {
          cb();
        } catch(e) {
          if (e === testError) threw = true;
        }
      }
      
      expect(threw).toBe(true);
      done();
    }, 100);
  });
});