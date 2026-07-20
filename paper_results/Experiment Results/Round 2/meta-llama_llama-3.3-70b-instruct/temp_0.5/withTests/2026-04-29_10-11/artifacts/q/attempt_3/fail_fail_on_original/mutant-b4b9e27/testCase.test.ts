import Queue = require("../queue");

describe('Queue', function () {
    it('should handle get after close', function () {
        const queue = new Queue();
        queue.close();
        return queue.get().then(function () {
            expect(true).toBe(false);
        }).catch(function (error) {
            expect(error.message).toBe("Can't get value from closed queue");
        });
    });
});