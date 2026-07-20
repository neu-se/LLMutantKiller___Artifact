import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should enable long stack support when Q_DEBUG is set', () => {
        // Set Q_DEBUG environment variable
        process.env.Q_DEBUG = 'true';

        // Load Q module again to apply the environment variable
        delete require.cache[require.resolve('../../../../../../../../subject_repositories/q/q.js')];
        const Q = require('../../../../../../../../subject_repositories/q/q.js');

        // If Q.longStackSupport is false, the test will fail because it's not the expected behavior
        expect(Q.longStackSupport).toBe(true);

        // Clean up
        delete process.env.Q_DEBUG;
    });
});