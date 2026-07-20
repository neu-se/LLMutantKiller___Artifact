import { Queue } from "./queue";

describe("Queue behavior on closed state", () => {
    it("should throw error when getting from closed queue", async () => {
        const queue = new Queue();
        queue.close();
        await expect(queue.get()).rejects.toThrow("Can't get value from closed queue");
    });
});