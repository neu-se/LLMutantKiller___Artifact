const Queue = require('../../../../queue');

describe('Queue', () => {
    it('should get the correct value from the queue', () => {
        const queue = Queue();
        queue.put('value');
        return queue.get('head').then((value) => {
            expect(value).toBe('value');
        });
    });
});