const Queue = require('../../../../queue');

describe('Queue', () => {
    it('should throw an error when getting from a queue with an empty string key', () => {
        const queue = Queue();
        queue.put('value');
        return queue.get('').then((value: any) => {
            expect(true).toBe(false); // should not get here
        }).catch((error: any) => {
            expect(error).toBeInstanceOf(Error);
        });
    });
});