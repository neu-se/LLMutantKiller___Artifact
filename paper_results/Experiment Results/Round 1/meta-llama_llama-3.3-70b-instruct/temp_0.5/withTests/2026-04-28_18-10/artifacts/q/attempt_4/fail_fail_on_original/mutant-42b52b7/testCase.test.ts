import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking behavior", () => {
    it("should track unhandled rejections correctly", () => {
        q.resetUnhandledRejections();
        const promise = q.reject("Test rejection");
        q.nextTick.runAfter(function () {
            q.untrackRejection(promise);
            const reasons = q.getUnhandledReasons();
            expect(reasons.length).toBe(0);
        });
    });
});