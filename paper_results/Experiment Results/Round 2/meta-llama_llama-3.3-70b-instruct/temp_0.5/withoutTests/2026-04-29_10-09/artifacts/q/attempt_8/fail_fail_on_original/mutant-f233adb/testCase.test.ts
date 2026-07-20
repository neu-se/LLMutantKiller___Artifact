describe('Q', () => {
    it('should define Q when ses is not defined', () => {
        const originalSes = global.ses;
        delete global.ses;
        const Q = require('./q.js');
        expect(Q).toBeDefined();
        if (originalSes) {
            global.ses = originalSes;
        }
    });
});