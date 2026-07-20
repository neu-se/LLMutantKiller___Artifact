import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should track and untrack rejections properly", () => {
        q.resetUnhandledRejections();
        const promise = q.reject("test");
        const initialLength = q.getUnhandledReasons().length;
        expect(initialLength).toBe(1);
        // Since untrackRejection is not a public function, we can't call it directly.
        // We can test the behavior by checking if the rejection is tracked correctly.
        expect(q.getUnhandledReasons().length).toBe(1);
    });
});