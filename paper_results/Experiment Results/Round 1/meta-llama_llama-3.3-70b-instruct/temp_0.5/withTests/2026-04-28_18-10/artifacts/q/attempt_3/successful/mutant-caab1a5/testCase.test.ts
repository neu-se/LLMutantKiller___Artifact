import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('when function', function () {
    it('should call the callback with the resolved value', function (done) {
        var deferred = Q.defer();
        var value = 'test';
        Q.when(deferred.promise, function (resolvedValue: any) {
            expect(resolvedValue).toBe(value);
            done();
        }, function (error: any) {
            expect(true).toBe(false);
        });
        deferred.resolve(value);
    });

    it('should call the error callback with the rejected reason', function (done) {
        var deferred = Q.defer();
        var reason = 'test';
        Q.when(deferred.promise, function (value: any) {
            expect(true).toBe(false);
        }, function (error: any) {
            expect(error).toBe(reason);
            done();
        });
        deferred.reject(reason);
    });
});