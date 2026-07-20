const q = require('../../../../../../../q/q.js');

describe('q', function () {
    it('should return true for a fulfilled promise', function () {
        var promise = q(10);
        expect(promise.isFulfilled()).toBe(true);
    });
});