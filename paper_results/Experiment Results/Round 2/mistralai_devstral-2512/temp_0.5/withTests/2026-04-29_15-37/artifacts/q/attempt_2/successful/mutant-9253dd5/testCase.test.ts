import Queue = require("../../../../../../../../../../../subject_repositories/q/queue.js");

describe("Queue get method", () => {
    it("should retrieve the correct value from the queue", async () => {
        const queue = Queue();
        queue.put("testValue");
        const result = await queue.get();
        expect(result).toBe("testValue");
    });
});