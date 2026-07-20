import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking behavior", () => {
    it("should track unhandled rejections correctly", () => {
        q.resetUnhandledRejections();
        const promise = q.reject("Test rejection");
        q.nextTick.runAfter(function () {
            const reasons = q.getUnhandledReasons();
            expect(reasons).toHaveLength(1);
            const reportedReasons = q.getUnhandledReasons();
            expect(reportedReasons).toHaveLength(1);
        });
    });
});