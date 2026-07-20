import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should set longStackSupport to true when Q_DEBUG is set', () => {
        // Set Q_DEBUG environment variable
        process.env.Q_DEBUG = 'true';

        // Reset Q to ensure it picks up the new environment variable
        delete require.cache[require.resolve('../../../../../../../../subject_repositories/q/q.js')];
        const Q = require('../../../../../../../../subject_repositories/q/q.js');

        // Check if longStackSupport is true
        expect(Q.longStackSupport).toBe(true);

        // Clean up
        delete process.env.Q_DEBUG;
    });
});