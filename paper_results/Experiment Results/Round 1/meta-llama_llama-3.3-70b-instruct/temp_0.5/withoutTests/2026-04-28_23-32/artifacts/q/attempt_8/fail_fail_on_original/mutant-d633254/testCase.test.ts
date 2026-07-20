const Queue = require("./queue.js");

describe('Queue', () => {
    it('should throw an error with a meaningful message when closed', async () => {
        const queue = new Queue();
        queue.close();
        try {
            await queue.get();
            throw new Error('Expected an error to be thrown');
        } catch (error: any) {
            expect(error.message).toBe('Can\'t get value from closed queue');
        }
    });
});