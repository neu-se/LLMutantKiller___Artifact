import { Q } from '../../q.js';

describe('Q long stack support', () => {
    it('should pass when long stack support is enabled', async () => {
        Q.longStackSupport = true;
        const promise = Q.reject(new Error('Test error'));
        await promise.catch((error: any) => {
            expect(error.stack).toContain('reject');
        });
    });

    it('should fail when long stack support is disabled', async () => {
        Q.longStackSupport = false;
        const promise = Q.reject(new Error('Test error'));
        await promise.catch((error: any) => {
            expect(error.stack).not.toContain('reject');
        });
    });
});