describe('q', () => {
    it('should correctly handle CommonJS module exports', () => {
        expect(typeof require('./q.js') === 'function').toBe(true);
    });
});