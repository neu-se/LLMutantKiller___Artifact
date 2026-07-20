import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking behavior", () => {
    it("should track unhandled rejections correctly", () => {
        q.resetUnhandledRejections();
        const promise = q.reject("Test rejection");
        q.nextTick.runAfter(function () {
            const reasons = q.getUnhandledReasons();
            expect(reasons).toHaveLength(1);
            if (typeof process === "object" && typeof process.emit === "function") {
                process.emit("rejectionHandled", reasons[0], promise);
            }
            const newReasons = q.getUnhandledReasons();
            expect(newReasons).toHaveLength(0);
        });
    });
});