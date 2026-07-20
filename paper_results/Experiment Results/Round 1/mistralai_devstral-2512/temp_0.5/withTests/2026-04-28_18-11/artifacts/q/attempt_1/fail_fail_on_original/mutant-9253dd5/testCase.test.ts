import { Queue } from "../../../../../../../../../../../subject_repositories/q/queue.js";

describe("Queue get method", () => {
  it("should retrieve the correct value from the queue", async () => {
    const queue = new Queue();
    const testValue = "test-value";
    queue.put(testValue);
    const retrievedValue = await queue.get();
    expect(retrievedValue).toBe(testValue);
  });
});