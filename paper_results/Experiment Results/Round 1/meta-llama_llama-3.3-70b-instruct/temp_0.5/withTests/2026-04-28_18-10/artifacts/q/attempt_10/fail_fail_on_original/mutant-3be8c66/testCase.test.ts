describe('Q', () => {
    const Q = require('./q');

    it('should return true for isFulfilled when given a fulfilled promise and false when given a rejected promise', () => {
        const fulfilledPromise = Q(10);
        const rejectedPromise = Q.reject(new Error());
        
        expect(Q.isFulfilled(fulfilledPromise)).toBe(true);
        expect(Q.isFulfilled(rejectedPromise)).toBe(false);
    });
});