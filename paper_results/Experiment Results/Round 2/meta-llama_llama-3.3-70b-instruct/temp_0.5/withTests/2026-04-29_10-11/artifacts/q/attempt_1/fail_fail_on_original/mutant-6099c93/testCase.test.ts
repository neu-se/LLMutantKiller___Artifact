import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of untrackRejection", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const reason = new Error("Test reason");
        Q.trackRejection(promise, reason);
        const atReport = Q.reportedUnhandledRejections.indexOf(promise);
        Q.untrackRejection(promise);
        expect(atReport).not.toBe(-1);
        expect(Q.reportedUnhandledRejections[atReport]).toBe(promise);
    });
});