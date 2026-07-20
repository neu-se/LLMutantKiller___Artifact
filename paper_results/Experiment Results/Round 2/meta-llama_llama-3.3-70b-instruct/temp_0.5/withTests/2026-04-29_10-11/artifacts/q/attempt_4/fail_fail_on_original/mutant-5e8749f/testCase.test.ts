import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should track and untrack rejections properly", () => {
        q.resetUnhandledRejections();
        const promise = q.reject("test");
        expect(q.unhandledRejections.length).toBe(1);
        q.untrackRejection(promise);
        expect(q.unhandledRejections.length).toBe(0);
    });
});