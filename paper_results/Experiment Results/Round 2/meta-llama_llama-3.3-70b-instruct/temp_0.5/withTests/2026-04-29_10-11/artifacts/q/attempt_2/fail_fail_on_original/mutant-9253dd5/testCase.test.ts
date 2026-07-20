import Queue = require("../../../../../../../../../subject_repositories/q/queue");

describe('Queue', () => {
    it('should get the correct value from the queue', () => {
        const queue = Queue();
        queue.put('value');
        return queue.get().then((value) => {
            expect(value).toBe('value');
        });
    });
});