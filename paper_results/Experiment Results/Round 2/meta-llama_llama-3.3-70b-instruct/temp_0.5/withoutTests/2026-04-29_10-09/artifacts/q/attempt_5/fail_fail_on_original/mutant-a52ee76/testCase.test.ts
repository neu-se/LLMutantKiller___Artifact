import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should set longStackSupport to true when Q_DEBUG is set and false otherwise', () => {
        // Check if longStackSupport is false when Q_DEBUG is not set
        expect(Q.longStackSupport).toBe(false);

        // Set Q_DEBUG environment variable
        process.env.Q_DEBUG = 'true';

        // Reload Q module to apply the change
        delete require.cache[require.resolve('../../../../../../../../subject_repositories/q/q.js')];
        const QReloaded = require('../../../../../../../../subject_repositories/q/q.js');

        // Check if longStackSupport is true when Q_DEBUG is set
        expect(QReloaded.longStackSupport).toBe(true);

        // Clean up
        delete process.env.Q_DEBUG;
    });
});