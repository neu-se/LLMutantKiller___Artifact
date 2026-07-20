describe('Q', () => {
    it('should have a ses property when ses is defined', () => {
        global.ses = { ok: () => true };
        const Q = require('./q.js');
        expect(Q.makeQ).toBeDefined();
        delete global.ses;
    });
});