describe('Q', () => {
    it('should execute the ses ok check', () => {
        const originalSesOk = global.ses && global.ses.ok;
        global.ses = { ok: () => false };
        const consoleErrorSpy = jest.spyOn(console, 'error');
        const Q = require('./q.js');
        expect(consoleErrorSpy).not.toHaveBeenCalled();
        delete global.ses;
        if (originalSesOk) {
            global.ses = { ok: originalSesOk };
        }
    });
});