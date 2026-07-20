import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.defer', function () {
    it('should reject with the error if it is truthy', function () {
        var deferred = Q.defer();
        var error = new Error('Test error');
        deferred.makeNodeResolver()(error);
        return deferred.promise.then(function () {
            expect(false).toBe(true);
        }, function (err) {
            expect(err).toBe(error);
        });
    });

    it('should resolve with the value if there is no error and more than one argument', function () {
        var deferred = Q.defer();
        deferred.makeNodeResolver()(null, 1, 2);
        return deferred.promise.then(function (value) {
            expect(value).toEqual([1, 2]);
        });
    });

    it('should resolve with the value if there is no error and one argument', function () {
        var deferred = Q.defer();
        deferred.makeNodeResolver()(null, 1);
        return deferred.promise.then(function (value) {
            expect(value).toBe(1);
        });
    });
});