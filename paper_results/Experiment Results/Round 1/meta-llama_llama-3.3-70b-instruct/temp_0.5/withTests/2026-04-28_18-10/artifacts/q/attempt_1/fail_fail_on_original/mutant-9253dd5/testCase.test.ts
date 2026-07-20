import { Queue } from "../../../../../../../../../../../subject_repositories/q/queue";

describe("queue", () => {
    it("should get the head of the queue", () => {
        const queue = new Queue();
        queue.put(1);
        queue.put(2);
        queue.put(3);
        return queue.get().then((value) => {
            expect(value).toBe(1);
        });
    });
});