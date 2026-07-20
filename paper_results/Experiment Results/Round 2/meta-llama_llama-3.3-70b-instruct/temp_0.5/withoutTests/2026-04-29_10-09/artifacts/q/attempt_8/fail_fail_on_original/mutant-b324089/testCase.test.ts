describe('Q', () => {
    it('nearer function should return the fulfillment value of a fulfilled promise', () => {
        const Q = require('../../../../../q.js');
        const promise = Q.resolve(42);
        expect(Q.nearer(promise)).toBe(42);
    });
});