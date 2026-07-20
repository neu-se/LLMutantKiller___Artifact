import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done", () => {
    it("should rethrow an error in the next turn if the callback throws when process.domain is truthy", () => {
        var error = new Error("Test error");
        var deferred = Q.defer();
        var promise = deferred.promise;

        // Simulate process.domain being truthy
        var originalDomain = (process as any).domain;
        (process as any).domain = { bind: function (fn) { return fn; } };

        promise.done(function () {
            throw error;
        }, function (err: Error) {
            expect(err).toBe(error);
        });

        deferred.resolve();

        // Restore original process.domain
        (process as any).domain = originalDomain;
    });
});