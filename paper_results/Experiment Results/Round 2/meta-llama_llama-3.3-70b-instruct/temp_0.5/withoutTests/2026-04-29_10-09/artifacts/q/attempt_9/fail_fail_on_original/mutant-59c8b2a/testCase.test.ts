describe('Q', () => {
    it('should test the behavior of valueOf function in promise', () => {
        const Q = require('./q');
        const deferred = Q.defer();
        const promise = deferred.promise;
        deferred.resolve(10);
        const valueOf = promise.valueOf;
        expect(typeof valueOf).toBe('function');
        expect(valueOf()).toBe(10);
    });
});