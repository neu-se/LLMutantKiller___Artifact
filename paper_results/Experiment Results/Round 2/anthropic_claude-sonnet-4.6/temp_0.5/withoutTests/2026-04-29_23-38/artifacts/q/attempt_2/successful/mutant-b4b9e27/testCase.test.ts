import Queue = require("../../../../../../../../../../../subject_repositories/q/queue.js");

describe("Queue close behavior", () => {
  it("should resolve the closed promise when queue is closed after a pending get", async () => {
    const queue = Queue();
    
    // Start a pending get operation - this will fail when queue is closed
    queue.get().catch(() => {});
    
    // Close the queue
    queue.close();
    
    // In original: closed.resolve(error) is called inside the fail handler,
    // so queue.closed resolves with the error value
    // In mutated: closed.resolve is never called, so queue.closed never resolves
    let closedResolved = false;
    let closedValue: unknown = undefined;
    
    await new Promise<void>((resolve) => {
      queue.closed.then((val: unknown) => {
        closedResolved = true;
        closedValue = val;
        resolve();
      });
      // Give enough time for the promise chain to settle
      setTimeout(resolve, 500);
    });
    
    expect(closedResolved).toBe(true);
    expect(closedValue).toBeInstanceOf(Error);
  });
});