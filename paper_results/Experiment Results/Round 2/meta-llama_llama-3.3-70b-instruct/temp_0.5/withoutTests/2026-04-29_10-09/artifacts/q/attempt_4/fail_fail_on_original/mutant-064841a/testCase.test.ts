import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q promise', () => {
    it('should have a stack trace when longStackSupport is enabled', async () => {
        Q.longStackSupport = true;
        const promise = Q.defer().promise;
        try {
            await promise.then(() => {
                throw new Error('Test error');
            });
        } catch (error: any) {
            expect(error.stack).toBeDefined();
            expect(typeof error.stack).toBe('string');
        }
    });
});