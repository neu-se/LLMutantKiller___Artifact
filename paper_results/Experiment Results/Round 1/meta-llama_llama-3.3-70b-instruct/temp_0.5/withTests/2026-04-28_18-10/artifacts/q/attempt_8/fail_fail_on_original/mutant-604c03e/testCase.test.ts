import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
    it("should not remove the promise from unhandledRejections when the promise is rejected and then another promise is rejected", () => {
        var deferred1 = q.defer();
        var promise1 = deferred1.promise;
        var deferred2 = q.defer();
        var promise2 = deferred2.promise;
        q.reject("reason1");
        q.reject("reason2");
        deferred1.resolve();
        expect(q.getUnhandledReasons().length).toBe(1);
    });
});