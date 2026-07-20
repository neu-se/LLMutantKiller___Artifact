import Queue = require("../../../../../../../../../../../subject_repositories/q/queue.js");

describe('Queue', () => {
    it('should correctly retrieve a value from the queue', async () => {
        const queue = new Queue();
        queue.put('test');
        const result = await queue.get();
        expect(result).toHaveProperty('head');
        expect(result.head).toBe('test');
    });
});