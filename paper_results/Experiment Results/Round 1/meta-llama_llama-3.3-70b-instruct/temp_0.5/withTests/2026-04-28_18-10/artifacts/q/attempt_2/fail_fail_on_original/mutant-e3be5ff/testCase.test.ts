import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle unhandled rejections correctly", () => {
        Q.resetUnhandledRejections();
        var deferred = Q.defer();
        Q.when(deferred.promise, function () {}, function () {}, function () {
            Q.reject("test reason");
        });
        deferred.resolve();
        expect(Q.getUnhandledReasons()).toEqual(["(no stack) test reason"]);
        Q.stopUnhandledRejectionTracking();
        Q.reject("test reason 2");
        expect(Q.getUnhandledReasons()).toEqual([]);
    });
});