import Queue = require("../../../../../../../../../../../subject_repositories/q/queue.js");

describe('Queue', () => {
    it('should throw an error with a meaningful message when closed', async () => {
        const queue = new Queue();
        queue.close();
        await expect(queue.closed).rejects.toThrowError('Can\'t get value from closed queue');
    });
});