import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", function () {
    it("should correctly handle the mutation", function () {
        var error = new Error("Test error");
        var promise = Q();
        promise.stackCounter = 1;

        var originalMakeStackTraceLong = Q.makeStackTraceLong;
        Q.makeStackTraceLong = function (error, promise) {
            originalMakeStackTraceLong.call(Q, error, promise);
            // Simulate the mutation by always setting error.__minimumStackCounter__ to a value that will cause the condition to be false
            error.__minimumStackCounter__ = promise.stackCounter + 1;
        };

        var deferred = Q.defer();
        deferred.reject(error);
        var promise2 = deferred.promise;
        promise2.then(null, function (err) {
            expect(err.__minimumStackCounter__).toBe(promise.stackCounter + 1);
        });

        Q.makeStackTraceLong = originalMakeStackTraceLong;
    });
});