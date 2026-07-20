import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should track and untrack rejections properly", () => {
        const promise = Q.reject("test");
        const originalLength = Q.unhandledRejections.length;
        Q.untrackRejection(promise);
        expect(Q.unhandledRejections.length).toBe(originalLength - 1);
    });
});