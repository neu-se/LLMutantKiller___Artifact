import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should set longStackSupport to true when Q_DEBUG is set', () => {
        // Set Q_DEBUG environment variable
        process.env.Q_DEBUG = 'true';

        // Check if longStackSupport is true when Q_DEBUG is set
        expect(Q.longStackSupport).toBe(true);

        // Clean up
        delete process.env.Q_DEBUG;
    });

    it('should not throw an error when Q_DEBUG is not set', () => {
        // Check if longStackSupport is false when Q_DEBUG is not set
        expect(() => {
            if (Q.longStackSupport !== false) {
                throw new Error('longStackSupport should be false when Q_DEBUG is not set');
            }
        }).not.toThrow();
    });
});