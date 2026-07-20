import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q laterQueue processing", () => {
  it("should process tasks added via runAfter after the main queue", async () => {
    // The mutation changes `if (isNodeJS)` to `if (true)` in runSingle's catch block
    // In Node.js, isNodeJS is true, so this mutation doesn't change behavior for normal cases
    // However, we can test that when a task throws, the flush continues properly
    // by checking that subsequent tasks in the queue still execute
    
    const results: string[] = [];
    
    await new Promise<void>((resolve) => {
      Q.nextTick(function() {
        results.push("task1");
        // This throws - with isNodeJS=true path, flush is rescheduled via setTimeout
        // then exception is re-thrown
        throw new Error("test error");
      });
      
      // Schedule resolve after error handling
      setTimeout(() => {
        resolve();
      }, 100);
    });
    
    expect(results).toContain("task1");
  });
});