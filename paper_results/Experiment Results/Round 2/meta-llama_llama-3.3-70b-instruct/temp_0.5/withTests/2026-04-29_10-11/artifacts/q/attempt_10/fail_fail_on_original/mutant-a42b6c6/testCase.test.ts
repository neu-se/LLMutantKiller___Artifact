describe('Q.defer', function () {
    it('should reject with the error if it is truthy in the original code and fail in the mutated code', function () {
        var Q = require('../../../../q.js');
        var deferred = Q.defer();
        var error = new Error('Test error');
        deferred.makeNodeResolver()(error);
        return deferred.promise.then(function () {
            expect(false).toBe(true);
        }, function (err: any) {
            expect(err).toBe(error);
        });
    });
});