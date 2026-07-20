describe('Q', () => {
    it('should not throw an error when ses is ok', () => {
        const originalSes = global.ses;
        global.ses = { ok: () => true };
        expect(() => {
            const Q = require('./q.js');
        }).not.toThrowError();
        if (originalSes) {
            global.ses = originalSes;
        } else {
            delete global.ses;
        }
    });
});