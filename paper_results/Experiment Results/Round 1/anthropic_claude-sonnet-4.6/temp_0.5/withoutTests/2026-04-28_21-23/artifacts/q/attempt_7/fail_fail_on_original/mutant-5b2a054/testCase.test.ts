import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick continues after error", () => {
  it("executes subsequent tasks after a throwing task via setTimeout flush", (done) => {
    const results: number[] = [];
    const originalListeners = process.rawListeners("uncaughtException");
    process.removeAllListeners("uncaughtException");
    
    // Suppress the uncaught exception from the throwing task
    process.on("uncaughtException", () => {});
    
    Q.nextTick(() => { throw new Error("task1 throws"); });
    Q.nextTick(() => {
      results.push(2);
    });
    Q.nextTick(() => {
      results.push(3);
      
      // Restore listeners
      process.removeAllListeners("uncaughtException");
      originalListeners.forEach(l => process.on("uncaughtException", l as any));
      
      expect(results).toEqual([2, 3]);
      done();
    });
  }, 10000);
});