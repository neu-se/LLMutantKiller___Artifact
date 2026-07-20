import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should track unhandled rejections correctly", () => {
        const promise = Q.reject("Test rejection");
        const originalUnhandledRejections = Q.getUnhandledReasons();
        Q.stopUnhandledRejectionTracking();
        Q.untrackRejection(promise);
        const newUnhandledRejections = Q.getUnhandledReasons();
        expect(newUnhandledRejections.length).toBeLessThan(originalUnhandledRejections.length);
    });
});