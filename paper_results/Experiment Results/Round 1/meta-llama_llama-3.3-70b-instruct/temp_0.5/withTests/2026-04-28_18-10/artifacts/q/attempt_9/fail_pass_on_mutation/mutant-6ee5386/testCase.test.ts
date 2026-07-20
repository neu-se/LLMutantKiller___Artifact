import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('defer and when', () => {
    it('observers called even after throw', () => {
        var called = false;
        var deferred = Q.defer();
        Q.when(deferred.promise, function () {
            throw new Error("In your face.");
        }, function () {
            called = true;
        });
        Q.when(deferred.promise, function () {
            expect(called).toBe(true);
        });
        deferred.resolve(10);
        return deferred.promise;
    });
});