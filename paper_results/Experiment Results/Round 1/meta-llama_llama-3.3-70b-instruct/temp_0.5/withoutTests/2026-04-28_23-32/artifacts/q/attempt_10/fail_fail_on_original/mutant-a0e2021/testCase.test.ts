describe('Q', () => {
    it('should enable long stack support when Q_DEBUG is set and process is an object', () => {
        // Set up the environment
        process.env.Q_DEBUG = 'true';

        // Create a new instance of Q
        const Q = require('../../../../../../../../subject_repositories/q/q.js');

        // Check if long stack support is enabled
        expect(Q.longStackSupport).toBe(true);
    });

    it('should not enable long stack support when process is not an object', () => {
        // Set up the environment
        const originalProcess = globalThis.process;
        globalThis.process = undefined;

        // Create a new instance of Q
        const Q = require('../../../../../../../../subject_repositories/q/q.js');

        // Check if long stack support is enabled
        expect(Q.longStackSupport).toBe(false);

        // Restore the original process
        globalThis.process = originalProcess;
    });
});