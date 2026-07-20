import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
    it("should remove the promise from unhandledRejections when untrackRejection is called", () => {
        var deferred = Q.defer();
        var promise = deferred.promise;
        Q.reject("reason");
        Q.untrackRejection(promise);
        expect(Q.unhandledRejections).not.toContain(promise);
    });
});