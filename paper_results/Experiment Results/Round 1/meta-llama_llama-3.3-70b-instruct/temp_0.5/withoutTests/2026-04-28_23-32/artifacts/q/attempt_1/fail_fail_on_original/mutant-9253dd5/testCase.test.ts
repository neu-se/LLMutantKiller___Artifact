import { Queue } from "../../../../../../../../../../../subject_repositories/q/queue.js";

describe('Queue', () => {
    it('should throw an error when getting from a closed queue', () => {
        const queue = new Queue();
        queue.close();
        expect(() => queue.get()).toThrowError('Can\'t get value from closed queue');
    });
});