const Queue = require("./queue.js");

describe("Queue", () => {
    it("should throw error when get fails and closed promise is resolved", (done) => {
        const queue = new Queue();
        const error = new Error("Test error");
        queue.close(error);
        queue.closed.then((err: any) => {
            expect(err).toBe(error);
            queue.get().catch((getErr: any) => {
                expect(getErr).toBe(error);
                done();
            });
        });
    });
});