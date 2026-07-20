import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should track unhandled rejections correctly", () => {
        const rejectionReason = new Error("Test rejection reason");
        Q.reject(rejectionReason);
        expect(Q.getUnhandledReasons()).toEqual([rejectionReason.stack]);
        Q.stopUnhandledRejectionTracking();
        Q.reject(rejectionReason);
        expect(Q.getUnhandledReasons()).toEqual([]);
    });
});