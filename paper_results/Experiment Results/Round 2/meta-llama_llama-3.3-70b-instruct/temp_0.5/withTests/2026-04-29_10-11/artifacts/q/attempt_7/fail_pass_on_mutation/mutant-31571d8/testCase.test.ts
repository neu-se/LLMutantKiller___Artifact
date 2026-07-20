import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", function () {
    it("should correctly handle the mutation", function (done) {
        var error = new Error("Test error");
        var promise = q(10);

        var deferred = q.defer();
        deferred.reject(error);
        var promise2 = deferred.promise;
        promise2.then(null, function (err) {
            expect(err).toBe(error);
            done();
        });
    });

    it("should fail with the mutation", function (done) {
        var error = new Error("Test error");
        var promise = q(10);

        var deferred2 = q.defer();
        deferred2.reject(error);
        var promise3 = deferred2.promise;
        promise3.then(null, function (err) {
            expect((err as any).__minimumStackCounter__).not.toBe(false);
            done();
        });
    });
});