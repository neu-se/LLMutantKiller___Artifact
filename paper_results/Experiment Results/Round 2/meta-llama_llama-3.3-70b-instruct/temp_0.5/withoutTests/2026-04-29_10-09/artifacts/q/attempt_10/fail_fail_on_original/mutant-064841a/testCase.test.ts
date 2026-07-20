import { Q } from '../../q';

describe('Q promise', () => {
    it('should have source when longStackSupport is enabled', () => {
        Q.longStackSupport = true;
        const deferred = Q.defer();
        const promise = deferred.promise;
        expect(promise.source).toBeDefined();
    });
});