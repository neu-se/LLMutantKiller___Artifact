import { Q } from './q.js';

describe('Q promise', () => {
    it('should have a stack trace when longStackSupport is enabled', () => {
        Q.longStackSupport = true;
        const deferred = Q.defer();
        const promise = deferred.promise;
        try {
            deferred.reject(new Error('Test error'));
        } catch (error) {
            expect(error.stack).toBeDefined();
        }
    });
});