import { Queue } from "../../../../../../../../../../../subject_repositories/q/queue.js";

describe("Queue error handling", () => {
    it("should propagate errors when getting from a closed queue", async () => {
        const queue = Queue();
        queue.close(new Error("Test error"));

        let errorThrown = false;
        try {
            await queue.get();
        } catch (error) {
            errorThrown = true;
            expect(error.message).toBe("Test error");
        }

        expect(errorThrown).toBe(true);
    });
});