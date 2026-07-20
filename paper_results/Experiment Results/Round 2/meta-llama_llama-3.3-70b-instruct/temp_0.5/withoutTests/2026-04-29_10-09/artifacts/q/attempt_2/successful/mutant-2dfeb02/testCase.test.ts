import Queue = require("../../../../../../../../../../../subject_repositories/q/queue.js");

describe('Queue', () => {
    it('should reject with an error when closed', async () => {
        const queue = Queue();
        queue.close();
        await expect(queue.get()).rejects.toThrowError();
    });
});