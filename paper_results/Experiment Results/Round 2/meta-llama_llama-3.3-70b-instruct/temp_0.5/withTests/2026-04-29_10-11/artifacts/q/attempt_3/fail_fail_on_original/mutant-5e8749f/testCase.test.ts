import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should track and untrack rejections properly", () => {
        const promise = q.Q.reject("test");
        q.Q.untrackRejection(promise);
        expect(q.Q.unhandledRejections.length).toBe(0);
    });
});