import Queue = require("../../../../../../../../../../../subject_repositories/q/queue.js");

describe("Queue close behavior", () => {
    it("should reject with an Error object when getting from a closed queue", async () => {
        const queue = Queue();
        await queue.close();
        try {
            await queue.get();
            fail("Expected promise to reject");
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    }, 10000);
});