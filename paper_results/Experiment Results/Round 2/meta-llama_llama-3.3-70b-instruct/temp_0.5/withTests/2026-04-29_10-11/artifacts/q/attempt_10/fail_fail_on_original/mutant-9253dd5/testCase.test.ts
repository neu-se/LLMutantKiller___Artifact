import { Queue } from "../../../../../../../../../../../subject_repositories/q/queue";

describe('Queue', () => {
    it('should get the correct value from the queue', () => {
        const queue: any = Queue();
        queue.put('value');
        return queue.get('head').then((value: any) => {
            expect(value).toBe('value');
        });
    });
});