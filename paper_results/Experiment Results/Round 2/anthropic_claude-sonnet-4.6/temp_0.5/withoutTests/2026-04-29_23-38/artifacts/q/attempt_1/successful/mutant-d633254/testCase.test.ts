import Queue from "../../../../../../../../../../../subject_repositories/q/queue.js";

describe("Queue close error message", () => {
  it("should use a descriptive error message when closing without an error argument", async () => {
    const queue = Queue();
    queue.close();
    
    let caughtError: Error | undefined;
    try {
      await queue.get();
    } catch (error) {
      caughtError = error as Error;
    }
    
    expect(caughtError).toBeDefined();
    expect(caughtError!.message).toBe("Can't get value from closed queue");
  });
});