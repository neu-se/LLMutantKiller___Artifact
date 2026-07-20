describe('Q', () => {
    it('should enable long stack support when Q_DEBUG is set in the process environment', () => {
        // Set up the environment
        process.env.Q_DEBUG = 'true';

        // Create a new instance of Q
        const Q = require('../../../../../../../../subject_repositories/q/q.js');

        // Check if long stack support is enabled
        expect(Q.longStackSupport).toBe(true);
    });

    it('should not enable long stack support when Q_DEBUG is not set in the process environment', () => {
        // Set up the environment
        delete process.env.Q_DEBUG;

        // Create a new instance of Q
        const Q = require('../../../../../../../../subject_repositories/q/q.js');

        // Check if long stack support is enabled
        expect(Q.longStackSupport).toBe(false);
    });
});