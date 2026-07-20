const Queue = require("../../../../../../../../../../../subject_repositories/q/queue.js");

describe("Queue close behavior", () => {
    it("should provide a descriptive error message when closing without an error", async () => {
        const queue = new Queue();
        const closedPromise = queue.close();
        await expect(closedPromise).rejects.toMatchObject({
            message: "Can't get value from closed queue"
        });
    }, 10000);
});