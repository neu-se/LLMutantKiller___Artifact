import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", function () {
    it("should correctly handle the mutation", function (done) {
        var error = new Error("Test error");
        var promise = q.Q(10);

        var originalMakeStackTraceLong = q.makeStackTraceLong;
        q.makeStackTraceLong = function (error, promise) {
            originalMakeStackTraceLong.call(q, error, promise);
            done();
        };

        var deferred = q.Q.defer();
        deferred.reject(error);
        var promise2 = deferred.promise;
        promise2.then(null, function (err) {
            expect(err).toBe(error);
        });

        q.makeStackTraceLong = originalMakeStackTraceLong;
    });

    it("should fail with the mutation", function (done) {
        var error = new Error("Test error");
        var promise = q.Q(10);

        var mutatedMakeStackTraceLong = function (error, promise) {
            // Simulate the mutation
            if (promise.stack && !(error as any).__minimumStackCounter__) {
                (error as any).__minimumStackCounter__ = false;
            } else {
                throw new Error("Mutation not applied");
            }
        };

        q.makeStackTraceLong = mutatedMakeStackTraceLong;

        var deferred2 = q.Q.defer();
        deferred2.reject(error);
        var promise3 = deferred2.promise;
        promise3.then(null, function (err) {
            expect(err.message).toBe("Mutation not applied");
            done();
        });
    });
});