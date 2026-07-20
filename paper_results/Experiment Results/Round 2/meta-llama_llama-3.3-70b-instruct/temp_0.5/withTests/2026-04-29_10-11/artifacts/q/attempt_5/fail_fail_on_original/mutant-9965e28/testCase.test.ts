import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should track rejection with stack trace when reason has a stack property", () => {
        const reason = new Error("Test error");
        const promise = Q.reject(reason);
        const originalTrackRejection = Q.trackRejection;
        let trackedReason: any;
        Q.trackRejection = (p: any, r: any) => {
            trackedReason = r;
        };
        Q.trackRejection(promise, reason);
        expect(trackedReason).toBe(reason.stack);
        Q.trackRejection = originalTrackRejection;
    });
});