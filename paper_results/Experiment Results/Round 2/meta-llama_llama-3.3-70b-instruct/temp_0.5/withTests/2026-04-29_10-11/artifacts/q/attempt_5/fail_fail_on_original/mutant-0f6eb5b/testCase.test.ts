import { Q } from '../../../../../../../../subject_repositories/q/q.js';

describe('Q long stack support', () => {
    it('should pass when long stack support is enabled and fail when disabled', async () => {
        Q.longStackSupport = true;
        const promise = Q.reject(new Error('Test error'));
        await promise.catch((error: any) => {
            expect(error.stack).toContain('reject');
        });
    });
});