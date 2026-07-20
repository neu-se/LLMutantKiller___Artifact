import { Queue } from "../../../../../../../../../../../subject_repositories/q/queue.js";

describe("Queue close method error message", () => {
    it("should provide a descriptive error message when closing without an error", async () => {
        const queue = new Queue();
        queue.close();
        try {
            await queue.get();
            fail("Expected an error to be thrown");
        } catch (error) {
            expect(error.message).toBe("Can't get value from closed queue");
        }
    });
});