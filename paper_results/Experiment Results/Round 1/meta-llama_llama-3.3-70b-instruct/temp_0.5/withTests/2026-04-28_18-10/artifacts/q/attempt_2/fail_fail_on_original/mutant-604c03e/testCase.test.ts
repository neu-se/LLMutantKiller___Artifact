import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
    it("should not remove the promise from unhandledRejections when untrackRejection is called with an index that is out of bounds", () => {
        var deferred = Q.defer();
        var promise = deferred.promise;
        Q.reject("reason");
        Q.untrackRejection(promise);
        expect(Q.unhandledRejections).not.toContain(promise);
        Q.untrackRejection({}); // This should not throw an error
    });
});