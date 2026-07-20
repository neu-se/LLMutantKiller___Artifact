import { jest } from '@jest/globals';

describe("Q runSingle error handling", () => {
  it("should throw errors asynchronously (not synchronously) when isNodeJS is false", () => {
    let Q: any;
    
    // Load Q with isNodeJS = false and requestTick = setTimeout
    jest.isolateModules(() => {
      const origProcessToString = process.toString;
      const origSetImmediate = (global as any).setImmediate;
      
      // Make process.toString return non-Node value → isNodeJS = false
      (process as any).toString = () => "[object Object]";
      // Remove setImmediate so requestTick uses setTimeout
      delete (global as any).setImmediate;
      
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
      
      // Restore
      (process as any).toString = origProcessToString;
      (global as any).setImmediate = origSetImmediate;
    });
    
    jest.useFakeTimers();
    
    const results: string[] = [];
    
    Q.nextTick(() => {
      results.push("task1");
      throw new Error("intentional error");
    });
    
    Q.nextTick(() => {
      results.push("task2");
    });
    
    // Run only the pending timers (the initial flush via setTimeout(flush, 0))
    // In original code (isNodeJS=false): error thrown async, flush continues, task2 runs
    // In mutated code (if true): error thrown sync, flush interrupted, task2 NOT run yet
    jest.runOnlyPendingTimers();
    
    expect(results).toEqual(["task1", "task2"]);
    
    jest.useRealTimers();
  });
});