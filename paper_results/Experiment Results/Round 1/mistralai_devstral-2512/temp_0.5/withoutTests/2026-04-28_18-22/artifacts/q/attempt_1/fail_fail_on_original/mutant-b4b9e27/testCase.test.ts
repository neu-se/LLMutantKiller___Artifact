import { Queue } from "./queue.js";

describe("Queue behavior on closed queue", () => {
    it("should throw an error when getting from a closed queue", async () => {
        const queue = new Queue();
        await queue.close();
        await expect(queue.get()).rejects.toThrow("Can't get value from closed queue");
    });
});