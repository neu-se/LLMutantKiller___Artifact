describe('Q', () => {
    it('should have a delete method', () => {
        const Q = require('./q');
        const obj = Q({});
        expect(typeof obj.delete).toBe('function');
    });
});