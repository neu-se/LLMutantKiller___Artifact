const Queue = require("../queue");

describe('Queue', function () {
    it('should handle get after put and close', function () {
        const queue = Queue();
        queue.put(1);
        queue.close();
        return queue.get().then(function (value: any) {
            expect(true).toBe(false);
        }).catch(function (error: any) {
            expect(error.message).toBe("Can't get value from closed queue");
        });
    });
});