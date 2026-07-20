import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should not call the progress listener when threw is true', () => {
        var deferred = Q.defer();
        var threw = true;

        var progressCalled = false;

        var promise = deferred.promise.then(
            function () {
                expect(progressCalled).toBe(false);
            },
            function () {
                expect(true).toBe(false);
            },
            function () {
                if (!threw) {
                    progressCalled = true;
                }
            }
        );

        deferred.notify();
        deferred.resolve();

        return promise;
    });
});