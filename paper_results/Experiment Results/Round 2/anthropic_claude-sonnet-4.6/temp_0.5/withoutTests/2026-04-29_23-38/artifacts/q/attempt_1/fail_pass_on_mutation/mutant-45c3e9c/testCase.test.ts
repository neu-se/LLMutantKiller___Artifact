import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nextTick.runAfter mutation detection", () => {
  it("should process tasks queued via runAfter when not currently flushing", async () => {
    // The mutation changes `if (!flushing)` to `if (false)` in runAfter
    // This means tasks added via runAfter won't trigger a new flush cycle
    // when the queue is not currently being flushed.
    //
    // We test this by using runAfter directly and verifying the task executes.
    
    const results: string[] = [];
    
    // Call runAfter when we're not in a flush cycle (flushing = false)
    // In the original code, this should trigger requestTick() and eventually run the task
    // In the mutated code, the task will never be scheduled to run
    Q.nextTick.runAfter(function () {
      results.push("runAfter task executed");
    });
    
    // Wait for the async queue to process
    await new Promise<void>((resolve) => {
      // Use multiple nextTick calls to ensure the runAfter task has time to execute
      Q.nextTick(function () {
        Q.nextTick(function () {
          Q.nextTick(function () {
            resolve();
          });
        });
      });
    });
    
    // In the original code, runAfter triggers flushing when !flushing
    // so the laterQueue task should have been executed
    // In the mutated code (if (false)), it never starts flushing for runAfter tasks
    // when called outside a flush cycle
    expect(results).toContain("runAfter task executed");
  });
});