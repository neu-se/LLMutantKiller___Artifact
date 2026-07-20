import { Queue } from "../../../../../../../../../../../subject_repositories/q/queue";

describe('Queue', () => {
    it('should resolve the error when getting from a closed queue', async () => {
        const queue = Queue();
        queue.close();
        await expect(queue.get()).rejects.toThrowError('Can\'t get value from closed queue');
    });
});