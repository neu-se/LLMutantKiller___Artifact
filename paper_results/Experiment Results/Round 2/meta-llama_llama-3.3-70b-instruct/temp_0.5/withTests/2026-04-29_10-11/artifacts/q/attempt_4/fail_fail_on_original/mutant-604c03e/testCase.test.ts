import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection reporting", () => {
    it("should correctly untrack a rejection when the promise is resolved", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const rejectionReason = new Error("Unhandled rejection");
        deferred.reject(rejectionReason);

        const at = Q.unhandledRejections.indexOf(promise);
        if (at !== -1) {
            Q.unhandledRejections.splice(at, 1);
            Q.unhandledReasons.splice(at, 1);
        }

        expect(Q.getUnhandledReasons()).toEqual([]);
    });
});