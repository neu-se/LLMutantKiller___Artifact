import Queue = require("../../../../../../../../../../../subject_repositories/q/queue.js");

describe("Queue", () => {
    it("should close the queue and reject the promise when an error occurs", async () => {
        const queue = new Queue();
        const error = new Error("Test error");
        queue.close(error);
        await expect(queue.get()).rejects.toThrowError(error);
    });
});