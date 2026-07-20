describe('Q', () => {
    it('should have a "finally" method on the Promise prototype', () => {
        const Q = require('./q.js');
        const promise = Q.resolve();
        expect(promise).toHaveProperty('finally');
        promise.finally(() => {});
    });
});