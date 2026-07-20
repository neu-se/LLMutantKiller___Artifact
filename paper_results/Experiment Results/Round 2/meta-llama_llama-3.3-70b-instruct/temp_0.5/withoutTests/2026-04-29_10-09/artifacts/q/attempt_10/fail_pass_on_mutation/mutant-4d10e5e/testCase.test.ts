import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should have longStackSupport as false when hasStacks is false', () => {
        const originalEnv = process.env;
        delete process.env.Q_DEBUG;
        expect(Q.longStackSupport).toBe(false);
        process.env = originalEnv;
        const error = new Error();
        const promise = Q.reject(error);
        const stack = promise.inspect().reason.stack;
        expect(typeof stack).toBe('string');
        expect(stack).not.toContain('q.js');
    });
});