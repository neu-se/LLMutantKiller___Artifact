import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done", () => {
    it("should rethrow an error in the next turn if the callback throws", () => {
        var turn = 0;
        Q.nextTick(function () {
            ++turn;
        });

        var error = new Error("Test error");
        var deferred = Q.defer();
        var promise = deferred.promise;

        promise.done(function () {
            throw error;
        });

        Q.onerror = function (err) {
            expect(turn).toBe(1);
            expect(err).toBe(error);
        };

        deferred.resolve();
    });
});