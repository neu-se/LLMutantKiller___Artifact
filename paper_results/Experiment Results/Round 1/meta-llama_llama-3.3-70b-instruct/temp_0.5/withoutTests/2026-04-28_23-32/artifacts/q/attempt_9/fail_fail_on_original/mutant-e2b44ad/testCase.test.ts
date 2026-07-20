describe('Q', () => {
    it('should handle process.domain correctly', () => {
        const Q = require('../../../q.js');
        const originalProcess = global.process;
        global.process = { toString: () => '[object Object]' };
        const promise = Q.resolve();
        expect(() => promise.done()).toThrow();
        global.process = originalProcess;
    });
});