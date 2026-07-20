import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should call the progress listener when threw is false and not call when threw is true', () => {
        var deferred = Q.defer();
        var threw = false;

        var progressCalled = false;

        var promise = deferred.promise.then(
            function () {
                expect(progressCalled).toBe(true);
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
        threw = true;
        deferred.notify();
        deferred.resolve();

        return promise;
    });
});