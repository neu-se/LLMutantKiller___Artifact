describe('Q', () => {
    it('should throw an error when trying to use Q', () => {
        expect(() => {
            const Q = require('./q.js');
            Q();
        }).toThrowError();
    });
});