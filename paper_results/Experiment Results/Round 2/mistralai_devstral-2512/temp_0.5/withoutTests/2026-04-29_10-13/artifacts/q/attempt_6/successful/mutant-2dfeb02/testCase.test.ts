import Queue = require("../../../../../../../../../../../subject_repositories/q/queue.js");

describe("Queue close behavior", () => {
    it("should reject with an Error object when getting from a closed queue", () => {
        const queue = Queue();
        queue.close();
        return queue.get().catch(error => {
            expect(error).toBeInstanceOf(Error);
        });
    });
});