const Queue = require("../../../../../../../../../../../subject_repositories/q/queue.js");

describe("Queue error handling", () => {
    it("should properly handle errors when queue is closed", async () => {
        const queue = new Queue();
        queue.close();
        try {
            await queue.get();
            fail("Expected an error to be thrown");
        } catch (error: any) {
            expect(error.message).toBe("Can't get value from closed queue");
        }
    });
});