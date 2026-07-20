describe('Q', () => {
    it('nearer function should return the fulfillment value of a fulfilled promise', () => {
        const Q = require('./q.js');
        const promise = Q(42);
        expect(Q.nearer(promise)).not.toBeUndefined();
    });
});