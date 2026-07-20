import Queue = require("../../../../../../../../../../../subject_repositories/q/queue.js");

describe('Queue', () => {
    it('should correctly retrieve a value from the queue', (done) => {
        const queue = new Queue();
        queue.put('test');
        queue.get().then((value) => {
            expect(value.head).toBe('test');
            done();
        });
    });
});