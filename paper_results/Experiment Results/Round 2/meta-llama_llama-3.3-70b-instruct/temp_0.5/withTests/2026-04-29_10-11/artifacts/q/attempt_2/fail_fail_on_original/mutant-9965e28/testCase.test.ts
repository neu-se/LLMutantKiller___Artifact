import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("trackRejection function", () => {
    it("should track rejection with stack trace when reason has a stack property", () => {
        const reason = new Error("Test error");
        const promise = Q.reject(reason);
        const originalTrackRejection = Q.trackRejection;
        let trackedReason: any;
        Q.trackRejection = (p, r) => {
            trackedReason = r;
        };
        Q.trackRejection(promise, reason);
        expect(trackedReason).toBe(reason.stack);
        Q.trackRejection = originalTrackRejection;
    });

    it("should track rejection without stack trace when reason does not have a stack property", () => {
        const reason = {};
        const promise = Q.reject(reason);
        const originalTrackRejection = Q.trackRejection;
        let trackedReason: any;
        Q.trackRejection = (p, r) => {
            trackedReason = r;
        };
        Q.trackRejection(promise, reason);
        expect(trackedReason).toBe("(no stack) [object Object]");
        Q.trackRejection = originalTrackRejection;
    });
});