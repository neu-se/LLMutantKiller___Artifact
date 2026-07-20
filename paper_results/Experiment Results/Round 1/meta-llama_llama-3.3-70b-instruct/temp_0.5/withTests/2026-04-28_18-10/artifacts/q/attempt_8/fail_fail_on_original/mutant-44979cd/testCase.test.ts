describe('q', () => {
    it('should correctly handle CommonJS module exports', () => {
        const Q = require('./q.js');
        expect(typeof Q === 'function').toBe(true);
    });
});