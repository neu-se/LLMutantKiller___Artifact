import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('defer and when', () => {
    it('observers called even after throw', () => {
        var called = false;
        var deferred = Q.defer();
        Q.when(deferred.promise, function () {
            called = true;
            throw new Error("In your face.");
        }, function () {
            expect(called).toBe(true);
        });
        Q.when(deferred.promise, function () {
            expect(called).toBe(false);
        });
        deferred.resolve(10);
        return deferred.promise;
    });
});