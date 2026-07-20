const Queue = require("./queue.js");

describe("Queue", () => {
    it("should throw error when get fails", (done) => {
        const queue = new Queue();
        const error = new Error("Test error");
        queue.close(error);
        queue.get().catch((err: any) => {
            expect(err).toBe(error);
            done();
        });
    });
});