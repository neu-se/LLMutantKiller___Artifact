import Queue = require("../../../../../../../../../../../subject_repositories/q/queue.js");

describe("Queue close behavior", () => {
  it("should preserve the provided error when closing the queue with a specific error", async () => {
    const queue = Queue();
    const specificError = new Error("specific test error");
    
    // Close the queue with a specific error
    queue.close(specificError);
    
    // Try to get a value - should reject with the specific error
    let caughtError: any = null;
    try {
      await queue.get();
    } catch (err) {
      caughtError = err;
    }
    
    // In the original code, the specific error is preserved
    // In the mutated code, error is set to `true`, so caughtError would be `true` (not an Error instance)
    expect(caughtError).toBeInstanceOf(Error);
    expect(caughtError.message).toBe("specific test error");
  });
});