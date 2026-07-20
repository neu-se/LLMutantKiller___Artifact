const Queue = require('../../../../subject_repositories/q/queue.js');

describe('Queue', () => {
    it('should throw an error with a meaningful message when closed', async () => {
        const queue = new Queue();
        queue.close();
        try {
            await queue.get();
        } catch (error: any) {
            expect(error.message).not.toBe('');
        }
    });
});