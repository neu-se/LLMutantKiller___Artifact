import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
    it("should not remove the promise from unhandledRejections when the promise is rejected and then handled with a conditional check", () => {
        var deferred = q.defer();
        var promise = deferred.promise;
        q.reject("reason");
        promise.then(null, function(reason) {
            if (reason === "reason") {
                // do nothing
            }
        });
        expect(q.getUnhandledReasons().length).toBe(1);
    });
});