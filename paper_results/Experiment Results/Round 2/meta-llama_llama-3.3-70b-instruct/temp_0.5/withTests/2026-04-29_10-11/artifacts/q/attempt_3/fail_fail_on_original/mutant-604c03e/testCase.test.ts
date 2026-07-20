import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection reporting", () => {
    it("should untrack a rejection when the promise is resolved", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const rejectionReason = new Error("Unhandled rejection");
        deferred.reject(rejectionReason);

        Q.untrackRejection(promise);

        expect(Q.getUnhandledReasons()).toEqual([]);
    });
});