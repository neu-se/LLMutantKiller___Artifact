import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should track unhandled rejections correctly", () => {
        const promise = q.reject("Test rejection");
        const originalUnhandledRejectionsLength = q.getUnhandledReasons().length;
        q.stopUnhandledRejectionTracking();
        q.stopUnhandledRejectionTracking();
        const newUnhandledRejectionsLength = q.getUnhandledReasons().length;
        expect(originalUnhandledRejectionsLength).toBe(newUnhandledRejectionsLength);
    });
});