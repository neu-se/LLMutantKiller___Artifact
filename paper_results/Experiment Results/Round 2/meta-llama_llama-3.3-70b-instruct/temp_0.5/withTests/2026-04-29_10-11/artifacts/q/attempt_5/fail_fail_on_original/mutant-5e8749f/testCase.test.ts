import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should track and untrack rejections properly", () => {
        q.resetUnhandledRejections();
        const promise = q.reject("test");
        const initialLength = q.getUnhandledReasons().length;
        expect(initialLength).toBe(1);
        q.untrackRejection(promise);
        const finalLength = q.getUnhandledReasons().length;
        expect(finalLength).toBe(0);
    });
});