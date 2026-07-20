describe('Q', () => {
    it('should have a "finally" method on the Promise prototype', () => {
        const Q = require('../../../../q/q.js');
        const promise = Q.resolve();
        const hasFinallyMethod = Object.getOwnPropertyNames(promise).includes('finally');
        expect(hasFinallyMethod).toBe(true);
        promise.finally(() => {});
    });
});