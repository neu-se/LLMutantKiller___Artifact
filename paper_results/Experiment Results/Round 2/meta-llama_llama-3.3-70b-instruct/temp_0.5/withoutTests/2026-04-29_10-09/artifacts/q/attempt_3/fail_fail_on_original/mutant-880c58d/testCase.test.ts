import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not have longStackSupport enabled by default and should be enabled when Q_DEBUG is set', () => {
        delete process.env.Q_DEBUG;
        const originalCodeQ = Q;
        expect(originalCodeQ.longStackSupport).toBe(false);
        process.env.Q_DEBUG = 'true';
        const originalCodeQWithEnv = Q;
        expect(originalCodeQWithEnv.longStackSupport).toBe(true);
    });
});