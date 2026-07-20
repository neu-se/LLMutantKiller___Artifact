import { Queue } from "../../../../../../../../../../../subject_repositories/q/queue.js";

describe('Queue', () => {
    it('should throw an error with a meaningful message when closed', () => {
        const queue = new Queue();
        queue.close();
        expect(queue.get()).rejects.toThrowError('Can\'t get value from closed queue');
    });
});