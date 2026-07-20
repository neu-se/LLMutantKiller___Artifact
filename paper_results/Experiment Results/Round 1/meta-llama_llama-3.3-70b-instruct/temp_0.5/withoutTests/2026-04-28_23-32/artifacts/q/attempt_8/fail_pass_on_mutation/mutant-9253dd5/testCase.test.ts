import Queue = require("../../../../../../../../../../../subject_repositories/q/queue.js");

describe('Queue', () => {
    it('should correctly retrieve a value from the queue', () => {
        const queue = new Queue();
        queue.put('test');
        const result = queue.get();
        expect(result).rejects.toThrow();
    });
});