import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not enable long stack support when Q_DEBUG is not set', () => {
        // Set up the environment
        delete process.env.Q_DEBUG;

        // Create a new instance of Q
        const q = Q;

        // Check if long stack support is enabled
        expect(q.longStackSupport).toBe(false);
    });
});