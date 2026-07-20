import Queue = require("../../../../../../../../../subject_repositories/q/queue");

describe('Queue', function () {
    it('should handle get after close', function () {
        const queue = Queue();
        queue.close();
        return queue.get().then(function (value: any) {
            expect(true).toBe(false);
        }).catch(function (error: any) {
            expect(error.message).toBe("Can't get value from closed queue");
        });
    });
});