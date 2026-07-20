import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection process.emit guard", () => {
  it("should not schedule runAfter callback when process.emit is not a function", async () => {
    const originalEmit = process.emit;
    
    // Make process.emit not a function
    // @ts-ignore
    process.emit = undefined;
    
    let runAfterCallCount = 0;
    const originalRunAfter = Q.nextTick.runAfter;
    Q.nextTick.runAfter = function(task: Function) {
      runAfterCallCount++;
      return originalRunAfter(task);
    };
    
    try {
      Q.reject(new Error("test"));
      
      // In original: runAfter not called because process.emit is not a function
      // In mutated: runAfter IS called because condition is always true
      expect(runAfterCallCount).toBe(0);
    } finally {
      process.emit = originalEmit;
      Q.nextTick.runAfter = originalRunAfter;
      Q.resetUnhandledRejections();
    }
  });
});