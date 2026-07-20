import { Queue } from "../../../../../../../../../../../subject_repositories/q/queue.js";

describe("Queue error handling", () => {
    it("should properly handle errors when queue is closed", async () => {
        const queue = new Queue();
        const error = new Error("Test error");
        queue.close(error);

        try {
            await queue.get();
            fail("Expected error to be thrown");
        } catch (e) {
            expect(e).toBe(error);
        }
    });
});