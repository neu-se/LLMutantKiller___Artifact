import { Queue } from "./queue.js";

describe("Queue close behavior", () => {
    it("should provide a descriptive error message when closing without an error", async () => {
        const queue = new Queue();
        const closePromise = queue.close();

        try {
            await queue.get();
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Can't get value from closed queue");
        }

        await closePromise;
    });
});