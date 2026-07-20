import Queue = require("../../../../../../../../../../../subject_repositories/q/queue.js");

describe("Queue close behavior", () => {
    it("should reject with an Error object when getting from a closed queue", async () => {
        const queue = new Queue();
        await queue.close();
        await expect(queue.get()).rejects.toBeInstanceOf(Error);
    });
});