import { Queue } from "../../../../../../../../../../../subject_repositories/q/queue";

describe('Queue', () => {
    it('should throw an error when getting from a closed queue with an alternate error', () => {
        const queue = Queue();
        queue.close(new Error('Alternate reason'));
        return queue.get().then(() => {
            expect(true).toBe(false); // should not get here
        }).catch((error) => {
            expect(error.message).toBe('Alternate reason');
        });
    });
});