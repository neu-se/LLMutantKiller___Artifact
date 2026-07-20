import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not enable long stack support when Q_DEBUG is not set in process.env', () => {
        // Clear Q_DEBUG from process.env
        delete process.env.Q_DEBUG;

        // Check if longStackSupport is false
        const q = Q;
        expect(q.longStackSupport).toBe(false);
    });
});