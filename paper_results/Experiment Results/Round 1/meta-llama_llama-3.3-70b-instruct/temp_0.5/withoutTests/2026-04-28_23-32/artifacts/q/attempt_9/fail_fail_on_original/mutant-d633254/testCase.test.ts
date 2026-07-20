const Queue = require("./queue");

describe('Queue', () => {
    it('should throw an error with a meaningful message when closed', async () => {
        const queue = new Queue();
        queue.close();
        try {
            await queue.get();
        } catch (error: any) {
            if (error.message === '') {
                throw new Error('Expected an error message, but got an empty string');
            }
        }
    });
});