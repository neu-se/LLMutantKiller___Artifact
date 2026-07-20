import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
    it("should not remove the promise from unhandledRejections when the promise is rejected and then resolved", () => {
        var deferred = q.defer();
        var promise = deferred.promise;
        q.reject("reason");
        deferred.resolve();
        expect(q.getUnhandledReasons().length).toBe(1);
    });
});