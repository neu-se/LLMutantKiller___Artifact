import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking behavior", () => {
    it("should track unhandled rejections correctly", () => {
        q.resetUnhandledRejections();
        const promise = q.reject("Test rejection");
        q.nextTick.runAfter(function () {
            const reasons = q.getUnhandledReasons();
            expect(reasons.length).toBe(1);
            expect(reasons[0]).toContain("Test rejection");
        });
    });
});