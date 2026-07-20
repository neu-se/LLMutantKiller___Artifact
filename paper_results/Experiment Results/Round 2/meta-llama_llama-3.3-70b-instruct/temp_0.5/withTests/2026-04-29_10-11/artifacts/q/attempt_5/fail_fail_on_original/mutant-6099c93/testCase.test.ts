import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of untrackRejection", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const reason = new Error("Test reason");
        Q.trackRejection(promise, reason);
        Q.untrackRejection(promise);
        expect(Q.reportedUnhandledRejections.length).toBe(0);
    });
});