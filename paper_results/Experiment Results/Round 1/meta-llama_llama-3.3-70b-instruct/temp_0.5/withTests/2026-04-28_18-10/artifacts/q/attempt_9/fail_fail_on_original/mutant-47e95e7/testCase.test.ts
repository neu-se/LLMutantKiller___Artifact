describe('Promise', () => {
    it('should correctly handle isFulfilled for a fulfilled promise', () => {
        const Q = require('../../../../q');
        const promise = Q(10);
        expect(Q.isFulfilled(promise)).toBe(true);
    });

    it('should correctly handle isFulfilled for a rejected promise', () => {
        const Q = require('../../../../q');
        const error = new Error('Test error');
        const promise = Q.reject(error);
        expect(Q.isFulfilled(promise)).toBe(false);
    });

    it('should correctly handle isFulfilled for a pending promise', () => {
        const Q = require('../../../../q');
        const deferred = Q.defer();
        const promise = deferred.promise;
        expect(Q.isFulfilled(promise)).toBe(false);
    });
});