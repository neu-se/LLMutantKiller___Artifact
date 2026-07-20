import Queue from "../../../../../../../../../../../subject_repositories/q/queue.js";

describe("Queue error handling", () => {
    it("should properly handle errors when queue is closed", async () => {
        const queue = new Queue();
        const error = new Error("Test error");
        queue.close(error);

        await expect(queue.get()).rejects.toThrow(error);
    });
});