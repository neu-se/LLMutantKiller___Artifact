const Q = require('../../../../../../../../subject_repositories/q/q').Q;

describe('Q.isFulfilled', () => {
    it('should return true for a non-promise value and a fulfilled promise', () => {
        expect(Q.isFulfilled(1)).toBe(true);
        expect(Q.isFulfilled(Q(1))).toBe(true);
        expect(Q.isFulfilled(Q.resolve(1))).toBe(true);
    });
});