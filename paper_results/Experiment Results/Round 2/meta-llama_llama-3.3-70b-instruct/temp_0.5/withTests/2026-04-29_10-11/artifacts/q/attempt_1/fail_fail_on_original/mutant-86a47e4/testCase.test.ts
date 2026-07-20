import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q promise', () => {
    it('should call progress listener when progress is notified', () => {
        var deferred = Q.defer();
        var progressCalled = false;

        Q.when(deferred.promise, null, null, function () {
            progressCalled = true;
        });

        deferred.notify();

        return Q.delay(10).then(function () {
            expect(progressCalled).toBe(true);
        });
    });
});