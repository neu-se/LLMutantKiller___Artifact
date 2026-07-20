import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should track unhandled rejections correctly", () => {
        const promise = Q.reject("Test rejection");
        const originalUnhandledRejectionsLength = Q.getUnhandledReasons().length;
        Q.untrackRejection(promise);
        const newUnhandledRejectionsLength = Q.getUnhandledReasons().length;
        expect(newUnhandledRejectionsLength).toBeLessThan(originalUnhandledRejectionsLength);
    });
});