import Queue = require("../../../../../../../../../subject_repositories/q/queue.js");

describe("Queue", () => {
    it("should throw error when get fails", () => {
        const queue = new Queue();
        const error = new Error("Test error");
        queue.close(error);
        expect(() => queue.get()).rejects.toThrowError(error);
    });
});