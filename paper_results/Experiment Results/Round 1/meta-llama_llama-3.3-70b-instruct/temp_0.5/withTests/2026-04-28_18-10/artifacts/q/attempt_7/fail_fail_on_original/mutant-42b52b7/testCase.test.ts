import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking behavior", () => {
    it("should track unhandled rejections correctly", () => {
        q.resetUnhandledRejections();
        const promise = q.reject("Test rejection");
        q.nextTick.runAfter(function () {
            if (typeof process === "object" && typeof process.emit === "function") {
                process.emit("rejectionHandled", "Test rejection", promise);
            }
            const reasons = q.getUnhandledReasons();
            expect(reasons).toHaveLength(0);
        });
    });
});