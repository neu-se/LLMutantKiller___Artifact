describe('q', () => {
    it('should correctly handle CommonJS module exports', () => {
        const Q = require('../../../../../../../../../subject_repositories/q/q.js');
        expect(typeof Q === 'function').toBe(true);
    });
});