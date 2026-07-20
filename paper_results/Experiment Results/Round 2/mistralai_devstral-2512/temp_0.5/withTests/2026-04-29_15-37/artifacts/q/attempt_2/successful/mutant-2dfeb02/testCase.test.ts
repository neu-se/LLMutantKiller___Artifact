const Queue = require("../../../../../../../../../../../subject_repositories/q/queue.js");

describe("Queue close method behavior", () => {
    it("should reject with an Error object when closed without arguments", async () => {
        const queue = Queue();
        queue.close();
        await expect(queue.get()).rejects.toThrow("Can't get value from closed queue");
        await expect(queue.get()).rejects.toThrow("Can't get value from closed queue");
    });
});