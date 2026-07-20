import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not enable long stack support by default', () => {
        // If Q_DEBUG is not set, longStackSupport should be false
        process.env.Q_DEBUG = undefined;
        const q = Q;
        expect(q.longStackSupport).toBe(false);

        // If Q_DEBUG is set, longStackSupport should be true
        process.env.Q_DEBUG = 'true';
        const q2 = Q;
        expect(q2.longStackSupport).toBe(true);
    });
});