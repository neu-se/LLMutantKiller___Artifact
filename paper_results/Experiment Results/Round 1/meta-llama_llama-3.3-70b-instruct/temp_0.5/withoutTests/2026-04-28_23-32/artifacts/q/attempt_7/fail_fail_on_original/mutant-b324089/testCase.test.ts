const Q = require('./q.js');

describe('Q', () => {
    it('should return the fulfillment value of a promise', () => {
        const promise = Q('fulfilled');
        const result = Q.nearer(promise);
        expect(result).toBe('fulfilled');
    });
});