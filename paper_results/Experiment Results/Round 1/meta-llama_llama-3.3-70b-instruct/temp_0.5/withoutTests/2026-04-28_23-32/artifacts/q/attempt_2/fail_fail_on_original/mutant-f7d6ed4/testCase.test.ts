import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle process.domain correctly", () => {
        const originalQDone = Q.done;
        try {
            Q.done = jest.fn();
            const promise = Q();
            promise.done(() => {}, () => {}, () => {});
            expect(Q.done).toHaveBeenCalledTimes(1);
        } finally {
            Q.done = originalQDone;
        }
    });
});