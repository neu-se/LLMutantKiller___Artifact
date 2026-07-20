import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should not call the progress listener twice', () => {
        var deferred = Q.defer();
        var progressCount = 0;

        var promise = deferred.promise.then(
            function () {
                expect(progressCount).toBe(1);
            },
            function () {
                expect(true).toBe(false);
            },
            function () {
                progressCount++;
            }
        );

        deferred.notify();
        deferred.notify();
        deferred.resolve();

        return promise;
    });
});