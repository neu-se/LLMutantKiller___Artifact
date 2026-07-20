import { Queue } from "../../../../../../../../../../../subject_repositories/q/queue.js";

describe("Queue close behavior", () => {
  it("should resolve the closed promise when queue is closed and a get is pending", async () => {
    const queue = Queue();
    
    // Start a get operation that will be pending
    const getPromise = queue.get();
    
    // Close the queue
    const closedPromise = queue.close();
    
    // The closed promise should resolve (with the error)
    // and the get promise should reject with the error
    let getError: Error | null = null;
    let closedResolved = false;
    
    try {
      await getPromise;
    } catch (err) {
      getError = err as Error;
    }
    
    // Wait for closed promise to settle
    await closedPromise.then(() => {
      closedResolved = true;
    }).catch(() => {
      closedResolved = true;
    });
    
    // In original: getError should be set (error re-thrown) and closedResolved should be true
    // In mutated: getError would be null (error swallowed) and closedResolved might be false
    expect(getError).not.toBeNull();
    expect(getError!.message).toContain("closed queue");
    expect(closedResolved).toBe(true);
  });
});