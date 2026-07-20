import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done", () => {
    it("should rethrow an error in the next turn if the callback throws and process.domain is truthy", () => {
        var error = new Error("Test error");
        var deferred = Q.defer();
        var promise = deferred.promise;

        if (typeof process !== 'undefined' && process.domain) {
            promise.done(function () {
                throw error;
            }, function (err: Error) {
                expect(err).toBe(error);
            });
        } else {
            expect(true).toBe(false);
        }

        deferred.resolve();
    });
});