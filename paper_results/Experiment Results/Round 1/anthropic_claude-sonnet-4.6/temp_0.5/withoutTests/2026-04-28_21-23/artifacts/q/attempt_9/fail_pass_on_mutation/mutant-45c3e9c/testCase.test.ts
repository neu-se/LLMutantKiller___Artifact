import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick", () => {
  it("should execute tasks when flushing is definitively false using setImmediate boundary", () => {
    return new Promise<void>((resolve, reject) => {
      // Use setImmediate to get outside any active flush cycle
      // After setImmediate, flushing MUST be false
      setImmediate(() => {
        // Now intercept process.nextTick AFTER setImmediate
        const original = process.nextTick;
        let triggered = false;
        (process as any).nextTick = function(fn: Function, ...args: any[]) {
          triggered = true;
          (process as any).nextTick = original;
          return original.call(process, fn, ...args);
        };
        
        Q.nextTick(function() {});
        
        // Original: !flushing=true -> requestTick called -> triggered=true
        // Mutated: if(false) -> requestTick not called -> triggered=false
        if (triggered) {
          resolve();
        } else {
          reject(new Error("requestTick was not called - mutation detected"));
        }
      });
    });
  });
});