import Queue from "../../../../../../../../../../../subject_repositories/q/queue.js";

describe("Queue close behavior", () => {
    it("should provide a descriptive error message when closing without an error", async () => {
        const queue = new Queue();
        await expect(queue.close()).rejects.toThrow("Can't get value from closed queue");
    });
});