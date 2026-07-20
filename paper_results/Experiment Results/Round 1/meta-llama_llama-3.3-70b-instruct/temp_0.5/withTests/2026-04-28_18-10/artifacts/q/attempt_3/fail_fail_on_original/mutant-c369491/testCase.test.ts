import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should call the then method with the correct operation', () => {
        var deferred = Q.defer();
        var promise = deferred.promise;
        var called = false;

        promise.then(function(value) {
            called = true;
            expect(value).toBeUndefined();
        }, function(reason) {
            expect(true).toBe(false);
        }, function(progress) {
            expect(true).toBe(false);
        });

        deferred.resolve();

        expect(called).toBe(true);
    });
});