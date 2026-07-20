import { Queue } from "../../../../../../../../../../../subject_repositories/q/queue.js";

describe("Queue", () => {
    it("should resolve closed promise when get fails", () => {
        const queue = new Queue();
        const error = new Error("Test error");
        queue.close(error);
        let closedError: Error | null = null;
        queue.closed.then((err: Error) => {
            closedError = err;
        });
        return queue.get().catch(() => {
            expect(closedError).toBe(error);
        });
    });
});