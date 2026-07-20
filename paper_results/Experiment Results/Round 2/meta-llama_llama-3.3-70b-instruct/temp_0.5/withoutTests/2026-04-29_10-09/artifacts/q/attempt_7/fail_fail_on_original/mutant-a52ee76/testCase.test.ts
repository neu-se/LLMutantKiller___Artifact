import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when Q_DEBUG is set and longStackSupport is not true', () => {
        // Set Q_DEBUG environment variable
        process.env.Q_DEBUG = 'true';

        // Check if longStackSupport is true when Q_DEBUG is set
        if (Q.longStackSupport !== true) {
            throw new Error('longStackSupport should be true when Q_DEBUG is set');
        }

        // Clean up
        delete process.env.Q_DEBUG;
    });
});