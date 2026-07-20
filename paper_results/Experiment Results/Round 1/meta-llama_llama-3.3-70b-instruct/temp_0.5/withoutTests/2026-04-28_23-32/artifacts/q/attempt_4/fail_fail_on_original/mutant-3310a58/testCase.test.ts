import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not enable long stack support when Q_DEBUG is not set in process.env', () => {
        // Save the original process.env.Q_DEBUG
        const originalQDebug = process.env.Q_DEBUG;

        // Clear Q_DEBUG from process.env
        delete process.env.Q_DEBUG;

        // Check if longStackSupport is false
        const q = Q;
        expect(q.longStackSupport).toBe(false);

        // Restore the original process.env.Q_DEBUG
        process.env.Q_DEBUG = originalQDebug;
    });
});