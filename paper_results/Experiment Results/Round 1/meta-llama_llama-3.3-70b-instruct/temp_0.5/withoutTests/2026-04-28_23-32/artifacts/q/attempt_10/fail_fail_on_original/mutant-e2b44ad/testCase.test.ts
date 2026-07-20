describe('Q', () => {
    it('should handle process.domain correctly', () => {
        const Q = require('../../../q.js');
        const originalProcess = global.process;
        global.process = { toString: () => '[object process]' };
        const promise = Q.resolve();
        expect(() => promise.done()).not.toThrow();
        global.process = originalProcess;
    });
});