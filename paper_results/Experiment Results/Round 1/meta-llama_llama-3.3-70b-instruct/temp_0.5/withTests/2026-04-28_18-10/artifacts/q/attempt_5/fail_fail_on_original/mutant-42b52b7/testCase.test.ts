import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking behavior", () => {
    it("should track unhandled rejections correctly", () => {
        q.resetUnhandledRejections();
        const promise = q.reject("Test rejection");
        const reasonsBefore = q.getUnhandledReasons();
        q.nextTick.runAfter(function () {
            const reasonsAfter = q.getUnhandledReasons();
            expect(reasonsAfter.length).toBeGreaterThan(reasonsBefore.length);
        });
    });
});