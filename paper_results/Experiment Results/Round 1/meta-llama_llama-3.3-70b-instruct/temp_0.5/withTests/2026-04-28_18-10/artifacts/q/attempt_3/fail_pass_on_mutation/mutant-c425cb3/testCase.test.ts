import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should call the progress listener', () => {
        var deferred = Q.defer();
        var progressCalled = false;

        var promise = deferred.promise.then(
            function () {
                expect(progressCalled).toBe(true);
            },
            function () {
                expect(true).toBe(false);
            },
            function () {
                progressCalled = true;
            }
        );

        deferred.notify();
        deferred.resolve();

        return promise;
    });
});