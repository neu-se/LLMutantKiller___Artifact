import { Queue } from "../../../../../../../../../../../subject_repositories/q/queue";

describe("queue", () => {
    it("should throw an error when getting from a closed queue with a custom error", () => {
        const queue = Queue();
        const customError = new Error("Custom error");
        queue.close(customError);
        return queue.get().then(() => {
            expect(true).toBe(false);
        }).catch((error) => {
            expect(error).toBe(customError);
        });
    });
});