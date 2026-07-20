import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q promise', () => {
    it('should call progress listener when progress is notified', () => {
        var deferred = Q.defer();
        var progressCalled = false;

        Q.when(deferred.promise, function(value) {
            expect(value).toBe(10);
        }, function(error) {
            expect(true).toBe(false);
        }, function(progress) {
            progressCalled = true;
        });

        deferred.notify();
        deferred.resolve(10);

        return Q.delay(10).then(function () {
            expect(progressCalled).toBe(true);
        });
    });
});