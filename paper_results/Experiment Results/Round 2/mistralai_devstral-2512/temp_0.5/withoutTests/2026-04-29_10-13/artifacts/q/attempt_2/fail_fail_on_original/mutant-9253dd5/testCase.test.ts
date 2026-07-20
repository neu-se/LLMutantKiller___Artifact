import { Queue } from "../../../../../../../../../../../subject_repositories/q/queue.js";

describe("Queue get method", () => {
    it("should retrieve the correct value from the queue", async () => {
        const queue = new Queue();
        const testValue = "test";
        queue.put(testValue);
        const result = await queue.get();
        expect(result).toBe(testValue);
    });
});