import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection", () => {
  it("uses && not || to guard process.emit scheduling in untrackRejection", (done) => {
    const originalEmit = process.emit;
    
    // Create rejected promise
    const p = Q.reject(new Error("test"));
    
    // Wait for trackRejection's runAfter to complete
    // (laterQueue drains before setTimeout fires)
    setTimeout(() => {
      // At this point, trackRejection's runAfter has run
      // reportedUnhandledRejections contains p (if process.emit was called)
      
      // Replace process.emit with non-function
      (process as any).emit = null;
      
      // Spy on runAfter
      let runAfterCalled = false;
      const origRunAfter = (Q.nextTick as any).runAfter;
      (Q.nextTick as any).runAfter = function(task: Function) {
        runAfterCalled = true;
        // Don't execute to avoid TypeError
      };
      
      // Handle p - triggers untrackRejection (asynchronously via Q.nextTick)
      p.then(null, () => {});
      
      // Wait for the dispatch to run
      setTimeout(() => {
        (Q.nextTick as any).runAfter = origRunAfter;
        (process as any).emit = originalEmit;
        
        // Original (&&): typeof null !== "function" → false → runAfter NOT called
        // Mutated (||): typeof process === "object" → true → runAfter IS called
        expect(runAfterCalled).toBe(false);
        done();
      }, 100);
    }, 50);
  });
});