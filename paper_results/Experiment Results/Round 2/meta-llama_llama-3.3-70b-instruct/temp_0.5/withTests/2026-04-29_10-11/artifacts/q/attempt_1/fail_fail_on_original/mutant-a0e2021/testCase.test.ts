import { Q } from '../../../../../../../../subject_repositories/q/q';

describe('Q function', () => {
    it('should set Q.longStackSupport to true when Q_DEBUG is set', () => {
        process.env.Q_DEBUG = 'true';
        const originalQ = Q;
        const newQ = require('../../../../../../../../subject_repositories/q/q').Q;
        expect(newQ.longStackSupport).toBe(true);
        delete process.env.Q_DEBUG;
    });

    it('should not set Q.longStackSupport to true when Q_DEBUG is not set', () => {
        delete process.env.Q_DEBUG;
        const originalQ = Q;
        const newQ = require('../../../../../../../../subject_repositories/q/q').Q;
        expect(newQ.longStackSupport).toBe(false);
    });
});