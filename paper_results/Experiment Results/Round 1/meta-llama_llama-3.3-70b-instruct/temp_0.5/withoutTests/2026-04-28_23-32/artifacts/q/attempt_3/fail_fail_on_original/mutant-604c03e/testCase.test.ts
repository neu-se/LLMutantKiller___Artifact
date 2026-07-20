import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should track unhandled rejections correctly", () => {
        const promise = q.reject("Test rejection");
        const originalUnhandledRejections = q.getUnhandledReasons();
        q.untrackRejection(promise);
        const newUnhandledRejections = q.getUnhandledReasons();
        expect(originalUnhandledRejections.length).toBeGreaterThan(newUnhandledRejections.length);
    });
});