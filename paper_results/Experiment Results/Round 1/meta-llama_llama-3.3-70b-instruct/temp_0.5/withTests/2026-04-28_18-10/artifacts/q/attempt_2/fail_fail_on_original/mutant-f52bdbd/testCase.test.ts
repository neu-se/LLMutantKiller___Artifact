import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should track unhandled rejections correctly", () => {
        const rejectionReason = new Error("Test rejection reason");
        const promise = Q.reject(rejectionReason);
        Q.nextTick(() => {
            expect(Q.getUnhandledReasons()).toEqual([rejectionReason.stack]);
        });
    });
});