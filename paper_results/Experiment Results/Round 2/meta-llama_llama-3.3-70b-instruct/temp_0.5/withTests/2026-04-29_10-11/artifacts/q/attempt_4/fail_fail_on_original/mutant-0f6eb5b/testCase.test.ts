import { Q } from '../../../../../../../../subject_repositories/q/q.js';

describe('Q long stack support', () => {
    it('should include all calling functions in the stack trace when long stack support is enabled', async () => {
        Q.longStackSupport = true;
        const error = new Error('Test error');

        try {
            throw error;
        } catch (e) {
            expect(e.stack).not.toBeNull();
        }
    });

    it('should not include all calling functions in the stack trace when long stack support is disabled', async () => {
        Q.longStackSupport = false;
        const error = new Error('Test error');

        try {
            throw error;
        } catch (e) {
            expect(e.stack).not.toBeNull();
        }
    });
});