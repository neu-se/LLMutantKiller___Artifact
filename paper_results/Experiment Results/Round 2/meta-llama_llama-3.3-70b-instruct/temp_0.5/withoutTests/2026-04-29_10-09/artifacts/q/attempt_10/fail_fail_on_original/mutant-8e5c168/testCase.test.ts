const Q = require('../../../../../../../../subject_repositories/q/q.js');

describe('Q', () => {
    it('should throw an error when promise function does not call the resolver', () => {
        const originalPromise = Q.promise;
        Q.promise = function(resolver: (resolve: any, reject: any, notify: any) => void) {};
        expect(() => Q.promise((resolve: any, reject: any, notify: any) => {
            throw new Error('Resolver was not called');
        })).toThrowError('Resolver was not called');
        Q.promise = originalPromise;
    });
});