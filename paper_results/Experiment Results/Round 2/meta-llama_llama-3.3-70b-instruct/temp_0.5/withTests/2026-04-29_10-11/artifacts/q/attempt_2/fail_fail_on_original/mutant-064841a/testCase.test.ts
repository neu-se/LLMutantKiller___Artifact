import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q function with long stack support', () => {
    it('should include stack traces when longStackSupport is enabled', async () => {
        Q.longStackSupport = true;
        const deferred = Q.defer();
        deferred.reject(new Error('Test error'));
        try {
            await deferred.promise;
        } catch (error) {
            expect(error.stack).toContain('q.js');
        }
    });
});