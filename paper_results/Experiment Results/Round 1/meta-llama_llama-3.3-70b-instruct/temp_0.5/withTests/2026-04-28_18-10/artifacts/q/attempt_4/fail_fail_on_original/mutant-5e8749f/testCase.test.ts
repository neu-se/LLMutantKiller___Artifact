import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection", () => {
    it("should correctly untrack a rejection", () => {
        var deferred = Q.defer();
        var promise = deferred.promise;
        var rejectionReason = new Error("Test rejection reason");
        Q.trackRejection(promise, rejectionReason);
        var originalUnhandledRejectionsLength = Q.unhandledRejections.length;
        var originalUnhandledReasonsLength = Q.unhandledReasons.length;
        Q.untrackRejection(promise);
        expect(Q.unhandledRejections.length).toBe(originalUnhandledRejectionsLength - 1);
        expect(Q.unhandledReasons.length).toBe(originalUnhandledReasonsLength - 1);
    });
});