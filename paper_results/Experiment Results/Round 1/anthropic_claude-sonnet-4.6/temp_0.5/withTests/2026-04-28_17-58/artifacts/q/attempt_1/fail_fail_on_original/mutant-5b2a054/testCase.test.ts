import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nextTick error handling", () => {
  it("should continue processing queued tasks after a task throws an error", (done) => {
    const results: number[] = [];
    
    // Queue a task that throws
    Q.nextTick(function () {
      results.push(1);
      throw new Error("intentional error in task");
    });
    
    // Queue a subsequent task that should still run
    Q.nextTick(function () {
      results.push(2);
    });
    
    // Use a setTimeout to check results after the nextTick queue has been processed
    // We need to wait for the re-thrown error's setTimeout(flush, 0) to fire as well
    const originalOnerror = Q.onerror;
    
    // Capture the uncaught exception to prevent test failure from unhandled throw
    const uncaughtHandler = (err: Error) => {
      // expected - the error is re-thrown via setTimeout
    };
    
    process.on("uncaughtException", uncaughtHandler);
    
    setTimeout(function () {
      process.removeListener("uncaughtException", uncaughtHandler);
      Q.onerror = originalOnerror;
      
      try {
        // In the original code, after the error is re-thrown via setTimeout(flush, 0),
        // the flush continues and task 2 eventually runs.
        // The key observable: both tasks were attempted (task 1 ran before throwing,
        // task 2 runs after the flush resumes)
        expect(results).toContain(1);
        expect(results).toContain(2);
        done();
      } catch (e) {
        done(e);
      }
    }, 200);
  });
});