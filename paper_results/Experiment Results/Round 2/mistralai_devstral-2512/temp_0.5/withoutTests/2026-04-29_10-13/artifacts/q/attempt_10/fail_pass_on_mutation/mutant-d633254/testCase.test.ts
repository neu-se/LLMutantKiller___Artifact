const Queue = require("../../../../../../../../../../../subject_repositories/q/queue.js");

describe("Queue close behavior", () => {
    it("should provide a descriptive error message when closing without an error", () => {
        const queue = new Queue();
        queue.close().then(() => {
            throw new Error("Expected rejection");
        }).catch((error: Error) => {
            expect(error.message).toBe("Can't get value from closed queue");
        });
    }, 10000);
});