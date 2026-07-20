describe('Q', () => {
    it('should throw an error when ses is not ok', () => {
        const originalSes = global.ses;
        global.ses = { ok: () => false };
        expect(() => {
            require('./q.js');
        }).toThrowError('This environment was not anticipated by Q. Please file a bug.');
        if (originalSes) {
            global.ses = originalSes;
        } else {
            delete global.ses;
        }
    });
});