import { Queue } from "../../../../../../../../../../../subject_repositories/q/queue.js";

describe('Queue', () => {
    it('should reject with an error message when closed', async () => {
        const queue = new Queue();
        const error = new Error('Test error');
        queue.close(error);
        try {
            await queue.get();
            throw new Error('Expected an error to be thrown');
        } catch (thrownError) {
            expect(thrownError).toBe(error);
        }
    });
});