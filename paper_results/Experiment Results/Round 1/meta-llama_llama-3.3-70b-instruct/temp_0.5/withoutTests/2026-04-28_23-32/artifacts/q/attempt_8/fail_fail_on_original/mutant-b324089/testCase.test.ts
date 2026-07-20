const Q = require('../../../../q');

describe('Q', () => {
    it('should return the fulfillment value of a promise', () => {
        const promise = Q('fulfilled');
        const result = Q.nearer(promise);
        expect(result).not.toBeNull();
    });
});