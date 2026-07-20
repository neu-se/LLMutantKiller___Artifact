import { Q } from './q';

describe('Q promise', () => {
    it('should have a stack trace when longStackSupport is enabled', () => {
        Q.longStackSupport = true;
        const deferred = Q.defer();
        const promise = deferred.promise;
        deferred.reject(new Error('Test error'));
        promise.catch((error: any) => {
            expect(error.stack).toBeDefined();
        });
    });
});