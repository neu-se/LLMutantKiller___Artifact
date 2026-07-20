import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should set longStackSupport to true when Q_DEBUG is set', () => {
        // Set Q_DEBUG environment variable
        process.env.Q_DEBUG = 'true';

        // Check if longStackSupport is true
        expect(Q.longStackSupport).toBe(true);

        // Clean up
        delete process.env.Q_DEBUG;
    });
});