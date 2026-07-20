import Queue from "../../../../../../../../../../../subject_repositories/q/queue";

describe("queue", () => {
    it("should get the head of the queue", () => {
        const queue = Queue();
        queue.put(1);
        return queue.get().then((value) => {
            expect(value).toBe(1);
        });
    });
});