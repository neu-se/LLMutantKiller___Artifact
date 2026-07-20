import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q function with long stack support', () => {
    it('should include stack traces when longStackSupport is enabled', async () => {
        Q.longStackSupport = true;
        try {
            await Q().then(() => {
                throw new Error('Test error');
            });
        } catch (error) {
            expect(error.stack).toContain('q.js');
        }
    });
});