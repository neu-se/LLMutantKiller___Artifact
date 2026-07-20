import Queue from "../../../../../../../../../../../subject_repositories/q/queue.js";

describe("Queue", () => {
  it("should retrieve the value that was put into the queue", async () => {
    const queue = Queue();
    const expectedValue = "hello";
    
    queue.put(expectedValue);
    
    const result = await queue.get();
    
    expect(result).toBe(expectedValue);
  });
});