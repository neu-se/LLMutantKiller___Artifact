import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should have long stack support enabled when Q_DEBUG is set', () => {
        // Set Q_DEBUG environment variable to enable long stack support
        process.env.Q_DEBUG = 'true';

        // Create a new Q instance
        const q = Q();

        // Check if long stack support is enabled
        expect(Q.longStackSupport).toBe(true);
    });
});