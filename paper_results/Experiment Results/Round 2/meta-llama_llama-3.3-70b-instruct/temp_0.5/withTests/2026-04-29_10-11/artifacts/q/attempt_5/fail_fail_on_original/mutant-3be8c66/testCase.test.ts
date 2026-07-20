describe('Q.isFulfilled', function () {
    it('should return true for a fulfilled promise', function () {
        var Q = require('../../../../../../../../../subject_repositories/q/q.js');
        var promise = Q(10);
        expect(promise.isFulfilled()).toBe(true);
    });
});