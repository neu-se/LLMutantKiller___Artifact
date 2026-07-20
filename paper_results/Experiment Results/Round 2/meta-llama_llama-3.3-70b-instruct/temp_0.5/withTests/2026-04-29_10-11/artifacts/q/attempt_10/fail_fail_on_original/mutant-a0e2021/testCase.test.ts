describe('Q function', () => {
    it('should set Q.longStackSupport to true when process.env.Q_DEBUG is set and process is an object', () => {
        process.env.Q_DEBUG = 'true';
        const q = require('../../../../../../../../../../subject_repositories/q/q').Q;
        const originalCode = `
            if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
                Q.longStackSupport = true;
            }
        `;
        const mutatedCode = `
            if (true && process.env.Q_DEBUG) {
                Q.longStackSupport = true;
            }
        `;
        eval(originalCode);
        expect(q.longStackSupport).toBe(true);
        delete process.env.Q_DEBUG;
    });

    it('should not set Q.longStackSupport to true when process.env.Q_DEBUG is set and process is not an object', () => {
        process.env.Q_DEBUG = 'true';
        const q = require('../../../../../../../../../../subject_repositories/q/q').Q;
        const mutatedCode = `
            if (true && process.env.Q_DEBUG) {
                Q.longStackSupport = true;
            }
        `;
        eval(mutatedCode);
        expect(q.longStackSupport).toBe(true);
        delete process.env.Q_DEBUG;
    });
});