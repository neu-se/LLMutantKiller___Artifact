import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should enable long stack support when process.env.Q_DEBUG is set', () => {
        // Set Q_DEBUG in process.env
        process.env.Q_DEBUG = 'true';

        // Check if longStackSupport is true
        const q = Q;
        expect(q.longStackSupport).toBe(true);

        // Clear Q_DEBUG from process.env
        delete process.env.Q_DEBUG;
    });
});