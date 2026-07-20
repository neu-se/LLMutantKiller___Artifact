import Queue = require("../../../../../../../../../../../subject_repositories/q/queue");

describe("Queue", () => {
    it("should close with a default error message", () => {
        const queue = Queue();
        queue.close();
        return queue.get().catch((error: any) => {
            expect(error.message).toBe("Can't get value from closed queue");
        });
    });
});