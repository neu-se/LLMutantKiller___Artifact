import Queue from "../../../../../../../../../../../subject_repositories/q/queue.js";

describe("Queue close behavior", () => {
  it("should resolve the closed promise when get is called on a closed queue", async () => {
    const queue = Queue();
    
    // Close the queue with a specific error
    const closeError = new Error("Queue closed intentionally");
    queue.close(closeError);
    
    // Attempt to get from the closed queue - this should trigger the fail handler
    // which in the original code resolves the closed promise
    const getPromise = queue.get();
    
    // The get should reject since the queue is closed
    await expect(getPromise).rejects.toThrow();
    
    // The closed promise should resolve with the error
    // In the original: closed.resolve(error) is called in the fail handler
    // In the mutated: closed.resolve is never called, so this would hang/timeout
    const closedResult = await Promise.race([
      queue.closed,
      new Promise((_, reject) => setTimeout(() => reject(new Error("closed promise never resolved")), 1000))
    ]);
    
    // The closed promise should have been resolved with the error
    expect(closedResult).toBeDefined();
  });
});