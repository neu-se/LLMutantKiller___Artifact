import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection", () => {
    it("should correctly untrack a rejection", () => {
        var deferred = Q.defer();
        var promise = deferred.promise;
        var rejectionReason = new Error("Test rejection reason");
        Q.trackRejection(promise, rejectionReason);
        Q.untrackRejection(promise);
        expect(Q.unhandledRejections).not.toContain(promise);
    });
});