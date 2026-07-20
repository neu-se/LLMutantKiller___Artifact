import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q function', () => {
    it('should set Q.longStackSupport to true when process.env.Q_DEBUG is set and process is an object', () => {
        process.env.Q_DEBUG = 'true';
        const originalProcess = process;
        process = { ...process, env: process.env };
        const q = Q;
        expect(q.longStackSupport).toBe(true);
        process = originalProcess;
        delete process.env.Q_DEBUG;
    });
});