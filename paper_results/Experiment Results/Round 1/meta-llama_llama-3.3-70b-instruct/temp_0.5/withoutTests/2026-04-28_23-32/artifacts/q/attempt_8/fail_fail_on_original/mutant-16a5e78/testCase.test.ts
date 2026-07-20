describe('Q.isFulfilled', () => {
    it('should return true for a non-promise value', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q').Q;
        expect(Q.isFulfilled(1)).toBe(true);
        expect(Q.isFulfilled(Q(1))).toBe(true);
    });
});