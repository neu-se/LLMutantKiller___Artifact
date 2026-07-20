import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection process.emit guard", () => {
  it("should not attempt to call process.emit when it is not a function", async () => {
    const originalEmit = process.emit;
    
    // Make process.emit a non-function to expose the mutation
    (process as any).emit = null;
    
    const errors: Error[] = [];
    
    // Patch Q.nextTick.runAfter to catch errors from the laterQueue tasks
    const originalRunAfter = Q.nextTick.runAfter;
    Q.nextTick.runAfter = function(task: Function) {
      originalRunAfter(function() {
        try {
          task();
        } catch(e) {
          errors.push(e as Error);
        }
      });
    };
    
    try {
      const deferred = Q.defer();
      deferred.reject(new Error("test rejection"));
      
      // Handle the rejection - triggers untrackRejection
      await deferred.promise.catch(() => {});
      
      // Wait for async tasks including laterQueue to run
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Original: no errors (process.emit check prevents calling null)
      // Mutated: error (tries to call null as a function)
      expect(errors).toHaveLength(0);
    } finally {
      (process as any).emit = originalEmit;
      Q.nextTick.runAfter = originalRunAfter;
    }
  });
});