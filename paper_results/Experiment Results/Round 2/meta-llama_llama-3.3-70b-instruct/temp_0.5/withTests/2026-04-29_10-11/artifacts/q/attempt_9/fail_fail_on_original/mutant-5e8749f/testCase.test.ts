import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should track and untrack rejections properly", () => {
        q.resetUnhandledRejections();
        const promise = q.reject("test");
        const initialLength = q.getUnhandledReasons().length;
        expect(initialLength).toBe(1);
        promise.then(null, () => {});
        expect(q.getUnhandledReasons().length).toBe(0);
        q.resetUnhandledRejections();
        const promise2 = q.reject("test");
        const initialLength2 = q.getUnhandledReasons().length;
        expect(initialLength2).toBe(1);
        // Since untrackRejection is not a public function, we can't call it directly.
        // However, we can test if the rejection is still tracked after the promise is rejected.
        promise2.catch(() => {});
        expect(q.getUnhandledReasons().length).toBe(0);
    });
});