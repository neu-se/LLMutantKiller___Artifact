import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not have long stack traces enabled by default when Q_DEBUG is not set', () => {
        const originalEnv = process.env;
        delete process.env.Q_DEBUG;
        expect(Q.longStackSupport).toBe(false);
        process.env = originalEnv;
    });
});