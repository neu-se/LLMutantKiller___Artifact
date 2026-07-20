import { Queue } from "../../../../../../../../../../../subject_repositories/q/queue.js";
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Queue close method error handling", () => {
    it("should reject with the provided error when queue is closed", async () => {
        const queue = Queue();
        const customError = new Error("Custom close error");
        queue.close(customError);

        await expect(queue.get()).rejects.toThrow("Custom close error");
        await expect(queue.get()).rejects.toThrow("Custom close error");

        await expect(queue.closed).resolves.toEqual(customError);
    });
});