import { Queue } from "../../../../../../../../../../../subject_repositories/q/queue.js";

describe('Queue', () => {
    it('should correctly retrieve the head of the queue', () => {
        const queue = new Queue();
        queue.put('test value');
        const result = queue.get();
        expect(result).rejects.toThrowError('Can\'t get value from closed queue');
        queue.close();
        expect(queue.closed).resolves.toThrowError('Can\'t get value from closed queue');
    });
});