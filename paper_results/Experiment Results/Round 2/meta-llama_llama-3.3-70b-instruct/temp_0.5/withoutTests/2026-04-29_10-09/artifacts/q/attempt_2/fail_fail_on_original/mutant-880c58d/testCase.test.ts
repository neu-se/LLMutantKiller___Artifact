import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should set longStackSupport to true when Q_DEBUG is set in the environment', () => {
        process.env.Q_DEBUG = 'true';
        const originalCodeQ = Q;
        expect(originalCodeQ.longStackSupport).toBe(true);
        delete process.env.Q_DEBUG;
    });

    it('should set longStackSupport to false when Q_DEBUG is not set in the environment', () => {
        delete process.env.Q_DEBUG;
        const originalCodeQ = Q;
        expect(originalCodeQ.longStackSupport).toBe(false);
    });
});