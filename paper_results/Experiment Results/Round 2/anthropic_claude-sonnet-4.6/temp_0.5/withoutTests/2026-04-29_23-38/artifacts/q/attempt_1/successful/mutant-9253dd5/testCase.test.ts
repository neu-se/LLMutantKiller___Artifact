import Queue from "../../../../../../../../../../../subject_repositories/q/queue.js";

describe("Queue", () => {
  it("should retrieve the correct head value from the queue", async () => {
    const queue = Queue();
    const expectedValue = "test-value";
    
    queue.put(expectedValue);
    
    const result = await queue.get();
    
    expect(result).toBe(expectedValue);
  });
});