import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should track rejections properly", () => {
        q.resetUnhandledRejections();
        const promise = q.reject("test");
        const initialLength = q.getUnhandledReasons().length;
        expect(initialLength).toBe(1);
        promise.catch(() => {});
        // Since the promise is rejected and caught, it should not be in the unhandled reasons list.
        // However, if the untrackRejection function is not working correctly, it will still be in the list.
        expect(q.getUnhandledReasons().length).toBe(0);
    });
});