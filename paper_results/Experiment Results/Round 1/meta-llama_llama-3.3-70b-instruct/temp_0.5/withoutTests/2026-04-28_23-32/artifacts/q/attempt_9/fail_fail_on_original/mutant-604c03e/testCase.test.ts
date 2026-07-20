import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should track unhandled rejections correctly", () => {
        const promise1 = q.reject("Test rejection 1");
        const promise2 = q.reject("Test rejection 2");
        const originalUnhandledRejectionsLength = q.getUnhandledReasons().length;
        expect(originalUnhandledRejectionsLength).toBe(2);
        promise1.catch(() => {});
        const newUnhandledRejectionsLength = q.getUnhandledReasons().length;
        expect(newUnhandledRejectionsLength).toBe(1);
        promise2.catch(() => {});
        const finalUnhandledRejectionsLength = q.getUnhandledReasons().length;
        expect(finalUnhandledRejectionsLength).toBe(0);
    });
});