import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done", () => {
    it("should rethrow an error in the next turn if the callback throws", () => {
        var error = new Error("Test error");
        var deferred = Q.defer();
        var promise = deferred.promise;

        promise.done(function () {
            throw error;
        });

        Q.onerror = function (err) {
            expect(err).toBe(error);
        };

        deferred.resolve();
    });
});