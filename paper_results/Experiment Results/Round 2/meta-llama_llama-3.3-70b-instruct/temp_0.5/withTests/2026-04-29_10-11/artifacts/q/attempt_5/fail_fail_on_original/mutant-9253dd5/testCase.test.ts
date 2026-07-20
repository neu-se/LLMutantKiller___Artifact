import Queue = require('../../../../queue');

describe('Queue', () => {
    it('should get undefined when getting from a queue with an empty string key', () => {
        const queue = Queue();
        queue.put('value');
        return queue.get('').then((value) => {
            expect(value).toBeUndefined();
        });
    });
});