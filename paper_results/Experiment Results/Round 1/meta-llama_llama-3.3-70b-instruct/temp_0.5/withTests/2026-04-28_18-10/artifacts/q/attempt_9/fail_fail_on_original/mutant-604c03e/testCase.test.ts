import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
    it("should remove the promise from unhandledRejections when the promise is rejected and then handled", () => {
        var deferred = q.defer();
        var promise = deferred.promise;
        q.reject("reason");
        promise.then(null, function() {});
        expect(q.getUnhandledReasons().length).toBe(0);
    });
});