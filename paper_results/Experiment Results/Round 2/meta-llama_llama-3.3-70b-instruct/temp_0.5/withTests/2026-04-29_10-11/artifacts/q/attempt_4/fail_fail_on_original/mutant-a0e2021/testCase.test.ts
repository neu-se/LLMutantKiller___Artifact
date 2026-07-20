import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q function', () => {
    it('should set Q.longStackSupport to true when process.env.Q_DEBUG is set', () => {
        process.env.Q_DEBUG = 'true';
        const q = require('../../../../../../../../../../subject_repositories/q/q');
        expect(q.Q.longStackSupport).toBe(true);
        delete process.env.Q_DEBUG;
    });

    it('should not set Q.longStackSupport to true when process.env.Q_DEBUG is not set', () => {
        delete process.env.Q_DEBUG;
        const q = require('../../../../../../../../../../subject_repositories/q/q');
        expect(q.Q.longStackSupport).toBe(false);
    });
});