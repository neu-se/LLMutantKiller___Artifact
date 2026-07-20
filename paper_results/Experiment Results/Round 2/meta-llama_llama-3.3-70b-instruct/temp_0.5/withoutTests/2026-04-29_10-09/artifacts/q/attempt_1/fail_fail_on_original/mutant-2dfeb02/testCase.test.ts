import { Queue } from "../../../../../../../../../../../subject_repositories/q/queue.js";

describe('Queue', () => {
    it('should reject with an error when closed', async () => {
        const queue = new Queue();
        queue.close();
        await expect(queue.get()).rejects.toThrowError('Can\'t get value from closed queue');
    });
});