import { Q } from "./q.js";

describe('Q', () => {
    it('should have long stack support enabled when Q_DEBUG is set', () => {
        // Set Q_DEBUG environment variable to enable long stack support
        process.env.Q_DEBUG = 'true';

        // Create a new Q instance
        const q = Q();

        // Check if long stack support is enabled
        expect(Q.longStackSupport).toBe(true);
    });

    it('should throw an error with a stack trace when Q_DEBUG is set', () => {
        // Set Q_DEBUG environment variable to enable long stack support
        process.env.Q_DEBUG = 'true';

        // Create a new Q instance
        const q = Q();

        // Create a promise that rejects with an error
        const promise = Q.reject(new Error('Test error'));

        // Check if the error has a stack trace
        promise.catch((error: any) => {
            expect(error.stack).toContain('q.js');
        });
    });

    it('should not throw an error with a stack trace when Q_DEBUG is not set', () => {
        // Unset Q_DEBUG environment variable
        delete process.env.Q_DEBUG;

        // Create a new Q instance
        const q = Q();

        // Create a promise that rejects with an error
        const promise = Q.reject(new Error('Test error'));

        // Check if the error has a stack trace
        promise.catch((error: any) => {
            expect(error.stack).not.toContain('q.js');
        });
    });
});