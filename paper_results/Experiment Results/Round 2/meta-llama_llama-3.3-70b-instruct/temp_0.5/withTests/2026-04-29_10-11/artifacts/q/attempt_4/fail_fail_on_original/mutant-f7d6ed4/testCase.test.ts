import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done", () => {
    it("should rethrow an error in the next turn if the callback throws", () => {
        var deferred = Q.defer();
        var promise = deferred.promise;

        promise.done(function () {
            throw new Error("Test error");
        }, function (err: Error) {
            expect(err.message).toBe("Test error");
        });

        deferred.resolve();
    });
});