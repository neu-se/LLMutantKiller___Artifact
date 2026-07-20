const Queue = require("../../../../../../../../../subject_repositories/q/queue.js");

describe("Queue", () => {
    it("should throw error when get fails", (done) => {
        const queue = new Queue();
        const error = new Error("Test error");
        queue.close(error);
        queue.get().then(() => {
            done(new Error("Expected error to be thrown"));
        }).catch((err: any) => {
            expect(err).toBe(error);
            done();
        });
    });
});