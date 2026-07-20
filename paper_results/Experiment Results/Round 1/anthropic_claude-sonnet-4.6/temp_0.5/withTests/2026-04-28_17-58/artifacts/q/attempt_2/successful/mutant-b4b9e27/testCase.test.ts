const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
const Queue = require("../../../../../../../../../../../subject_repositories/q/queue.js");

describe("Queue", () => {
    it("should reject the get promise with the close error when the queue is closed", () => {
        const queue = Queue();
        queue.close();

        return queue.get().then(
            () => {
                throw new Error("Expected get() to reject, but it fulfilled");
            },
            (error: any) => {
                expect(error).toBeDefined();
                expect(error.message).toBe("Can't get value from closed queue");
            }
        );
    });
});