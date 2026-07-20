import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
    it("should remove the promise from unhandledRejections when untrackRejection is called with a promise that is in unhandledRejections", () => {
        var deferred = q.defer();
        var promise = deferred.promise;
        q.reject("reason");
        var originalLength = q.getUnhandledReasons().length;
        q.untrackRejection(promise);
        expect(q.getUnhandledReasons().length).toBe(originalLength - 1);
    });
});