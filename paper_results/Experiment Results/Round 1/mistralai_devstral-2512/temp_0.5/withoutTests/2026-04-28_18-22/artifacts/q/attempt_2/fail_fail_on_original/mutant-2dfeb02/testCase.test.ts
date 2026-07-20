import { Queue } from "../../../../../../../../../../../subject_repositories/q/queue.js";

describe("Queue close behavior", () => {
    it("should reject with an Error object when closed", async () => {
        const queue = new Queue();
        queue.close();
        await expect(queue.get()).rejects.toBeInstanceOf(Error);
    });
});