import Queue = require("../../../../../../../../../../../subject_repositories/q/queue");

describe("queue", () => {
    it("should throw an error when getting from a closed queue", () => {
        const queue = Queue();
        queue.close();
        return queue.get().then(() => {
            expect(true).toBe(false);
        }).catch((error) => {
            expect(error.message).toBe("Can't get value from closed queue");
        });
    });
});