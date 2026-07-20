import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
    it("should throw an error when untrackRejection is called with a promise that is not in unhandledRejections", () => {
        var deferred = q.defer();
        var promise = deferred.promise;
        expect(() => q.untrackRejection(promise)).toThrowError();
    });
});