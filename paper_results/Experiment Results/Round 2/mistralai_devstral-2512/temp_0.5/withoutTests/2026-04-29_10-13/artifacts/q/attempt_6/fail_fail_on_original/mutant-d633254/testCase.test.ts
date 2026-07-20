const Queue = require("../../../../../../../../../../../subject_repositories/q/queue.js");

describe("Queue close behavior", () => {
    it("should provide a descriptive error message when closing without an error", async () => {
        const queue = new Queue();
        let error: Error | null = null;
        try {
            await queue.close();
        } catch (e) {
            error = e as Error;
        }
        expect(error).not.toBeNull();
        expect(error!.message).toBe("Can't get value from closed queue");
    }, 10000);
});