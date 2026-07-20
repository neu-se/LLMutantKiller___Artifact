import Queue = require("../../../../../../../../../../../subject_repositories/q/queue.js");

describe('Queue', () => {
    it('should throw an error with a meaningful message when closed', async () => {
        const queue = new (Queue as any)();
        queue.close();
        await expect(queue.get()).rejects.toThrowError();
        const error = await queue.closed;
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).not.toBe('');
    });
});