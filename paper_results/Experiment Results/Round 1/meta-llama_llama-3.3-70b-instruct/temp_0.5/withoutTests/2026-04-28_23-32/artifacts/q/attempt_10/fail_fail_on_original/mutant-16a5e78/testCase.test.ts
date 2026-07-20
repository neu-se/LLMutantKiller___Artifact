const Q = require('./q').Q;

describe('Q.isFulfilled', () => {
    it('should return true for a non-promise value and false for a rejected promise', () => {
        expect(Q.isFulfilled(1)).toBe(true);
        expect(Q.isFulfilled(Q.reject(1))).toBe(false);
    });
});