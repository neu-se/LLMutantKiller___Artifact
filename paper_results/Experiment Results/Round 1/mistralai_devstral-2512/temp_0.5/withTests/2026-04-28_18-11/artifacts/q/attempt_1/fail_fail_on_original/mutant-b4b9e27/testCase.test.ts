import { Queue } from "../../../../../../../../../../../subject_repositories/q/queue.js";
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Queue error handling", () => {
    it("should close the queue and reject subsequent get operations with the error", async () => {
        const queue = Queue();
        const testError = new Error("Test error");

        // Close the queue with a specific error
        queue.close(testError);

        // Verify that the queue's closed promise resolves with the error
        const closedError = await queue.closed;
        expect(closedError).toBe(testError);

        // Verify that get operations are rejected with the same error
        await expect(queue.get()).rejects.toThrow(testError);
        await expect(queue.get()).rejects.toThrow(testError);
    });
});