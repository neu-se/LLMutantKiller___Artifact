describe('Q', () => {
    it('should return a promise that resolves with the correct value when using Q.promised', () => {
        const Q = require('../../../../q.js');
        const add = Q.promised(function (a: number, b: number) {
            return a + b;
        });
        return expect(add(2, 3)).resolves.toBe(5);
    });
});