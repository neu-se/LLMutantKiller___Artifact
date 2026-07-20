const Queue = require("../../../../../../../../../subject_repositories/q/queue");

describe('Queue', function () {
    it('should handle get after put and error', function () {
        const queue = Queue();
        queue.put(1);
        return queue.get().then(function (value) {
            expect(value).toBe(1);
            queue.put(2);
            return queue.get().then(function (value) {
                expect(value).toBe(2);
            });
        });
    });
});