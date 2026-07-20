import * as q from "../../../../../../../../../../../subject_repositories/q/q";

describe("q", () => {
    it("should track unhandled rejections correctly", () => {
        const rejectionReason = new Error("Test rejection reason");
        const promise = q.reject(rejectionReason);
        expect(promise.isRejected()).toBe(true);
        q.nextTick(() => {
            expect(q.getUnhandledReasons()).toEqual([rejectionReason.stack]);
        });
    });
});