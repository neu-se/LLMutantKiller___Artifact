import Queue = require("../../../../../../../../../../../subject_repositories/q/queue.js");

describe('Queue', () => {
    it('should reject with an error message when closed', async () => {
        const queue = new Queue();
        queue.close();
        try {
            await queue.get();
            throw new Error('Expected an error to be thrown');
        } catch (thrownError) {
            expect(thrownError.message).toBe("Can't get value from closed queue");
        }
    });
});