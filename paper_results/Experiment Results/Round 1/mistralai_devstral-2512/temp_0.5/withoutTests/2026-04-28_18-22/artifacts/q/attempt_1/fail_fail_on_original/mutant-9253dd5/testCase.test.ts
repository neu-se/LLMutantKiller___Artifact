import { Queue } from "./queue.js";

describe("Queue", () => {
    it("should correctly retrieve values from the queue", async () => {
        const queue = new Queue();
        const testValue = "test";
        queue.put(testValue);
        const result = await queue.get();
        expect(result).toBe(testValue);
    });
});