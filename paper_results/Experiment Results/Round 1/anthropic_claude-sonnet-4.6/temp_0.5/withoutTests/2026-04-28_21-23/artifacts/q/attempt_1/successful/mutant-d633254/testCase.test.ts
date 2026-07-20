import Queue from "../../../../../../../../../../../subject_repositories/q/queue.js";

describe("Queue close error message", () => {
  it("should use default error message with specific text when closed without error", async () => {
    const queue = Queue();
    queue.close();
    
    try {
      await queue.get();
      fail("Expected an error to be thrown");
    } catch (error: any) {
      expect(error.message).toBe("Can't get value from closed queue");
    }
  });
});