import { Queue } from "../../../../../../../../../../../subject_repositories/q/queue.js";
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Queue close error message", () => {
    it("should provide a descriptive error message when closing without an error", async () => {
        const queue = Queue();
        queue.close();
        try {
            await queue.get();
            fail("Expected an error to be thrown");
        } catch (error: any) {
            expect(error.message).toBe("Can't get value from closed queue");
        }
    });
});