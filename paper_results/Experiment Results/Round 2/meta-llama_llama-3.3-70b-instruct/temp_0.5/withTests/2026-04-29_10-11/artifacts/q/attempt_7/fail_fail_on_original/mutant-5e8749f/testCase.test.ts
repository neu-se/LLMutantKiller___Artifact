import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should track and untrack rejections properly", () => {
        q.resetUnhandledRejections();
        const promise = q.reject("test");
        const initialLength = q.getUnhandledReasons().length;
        expect(initialLength).toBe(1);
        // We can test the behavior by checking if the rejection is tracked correctly
        // after calling done on the promise.
        promise.done();
        expect(q.getUnhandledReasons().length).toBe(0);
    });
});