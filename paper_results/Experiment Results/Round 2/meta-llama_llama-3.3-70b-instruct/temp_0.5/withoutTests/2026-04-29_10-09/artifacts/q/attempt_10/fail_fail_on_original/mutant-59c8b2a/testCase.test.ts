describe('Q', () => {
    it('should test the behavior of valueOf function in promise', () => {
        const Q = require('../../../../q.js');
        const deferred = Q.defer();
        const promise = deferred.promise;
        deferred.resolve(10);
        expect(promise.valueOf).toBeDefined();
        expect(typeof promise.valueOf()).toBe('number');
    });
});