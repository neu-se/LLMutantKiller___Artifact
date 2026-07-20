import Queue = require("../../../../../../../../../../../subject_repositories/q/queue.js");

describe('Queue', () => {
    it('should correctly retrieve a value from the queue', (done) => {
        const queue: any = new Queue();
        queue.put('test');
        queue.get().then((value: any) => {
            expect(value).toHaveProperty('head');
            expect(value.head).toBe('test');
            done();
        });
    });
});