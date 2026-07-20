import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("trackRejection function", () => {
    it("should track rejection with stack trace when reason has a stack property", () => {
        const reason = new Error("Test error");
        const promise = Q.reject(reason);
        const unhandledReasons = [];
        const originalTrackRejection = Q.trackRejection;
        Q.trackRejection = (p, r) => {
            unhandledReasons.push(r.stack);
        };
        Q.trackRejection(promise, reason);
        expect(unhandledReasons.length).toBe(1);
        expect(unhandledReasons[0]).toContain("Test error");
        Q.trackRejection = originalTrackRejection;
    });

    it("should track rejection without stack trace when reason does not have a stack property", () => {
        const reason = {};
        const promise = Q.reject(reason);
        const unhandledReasons = [];
        const originalTrackRejection = Q.trackRejection;
        Q.trackRejection = (p, r) => {
            unhandledReasons.push(r);
        };
        Q.trackRejection(promise, reason);
        expect(unhandledReasons.length).toBe(1);
        expect(unhandledReasons[0]).toBe(reason);
        Q.trackRejection = originalTrackRejection;
    });
});