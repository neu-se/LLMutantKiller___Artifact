import { Q } from '../../../../../../../../../subject_repositories/q/q';

describe('Q', () => {
    it('should filter out internal frames from stack traces', () => {
        // Create a promise that rejects with an error
        const promise = Q.reject(new Error('Test error'));

        // Catch the rejection and check the stack trace
        promise.catch((error) => {
            const stackTrace = error.stack;

            // Check if the stack trace contains the internal frame
            expect(stackTrace).not.toContain('filterStackString');
        });
    });
});