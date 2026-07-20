describe('Q', () => {
    it('should test the behavior of the mutated file', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q.js');
        const deferred = Q.defer();
        const promise = deferred.promise;
        deferred.resolve();
        expect(promise.isFulfilled()).toBe(true);
    });
});