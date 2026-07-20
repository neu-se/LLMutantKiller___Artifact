const Queue = require("../../../../../../../../../../../subject_repositories/q/queue.js");

describe("Queue close behavior", () => {
    it("should provide a descriptive error message when closing without an error", async () => {
        const queue = new Queue();
        try {
            await queue.close();
            fail("Expected error to be thrown");
        } catch (error) {
            expect(error.message).toBe("Can't get value from closed queue");
        }
    }, 10000);
});