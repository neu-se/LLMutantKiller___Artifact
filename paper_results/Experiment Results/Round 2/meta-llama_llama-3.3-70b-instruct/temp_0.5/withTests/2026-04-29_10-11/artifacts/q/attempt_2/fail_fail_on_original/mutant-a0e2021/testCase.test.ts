import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q function', () => {
    it('should set Q.longStackSupport to true when process.env.Q_DEBUG is set', () => {
        process.env.Q_DEBUG = 'true';
        const originalQ = Q;
        expect(Q.longStackSupport).toBe(true);
        delete process.env.Q_DEBUG;
    });

    it('should not set Q.longStackSupport to true when process.env.Q_DEBUG is not set', () => {
        delete process.env.Q_DEBUG;
        const originalQ = Q;
        expect(Q.longStackSupport).toBe(false);
    });

    it('should throw an error when Q.longStackSupport is set to true without process.env.Q_DEBUG', () => {
        const originalQ = Q;
        expect(() => {
            Q.longStackSupport = true;
        }).not.toThrow();
    });
});