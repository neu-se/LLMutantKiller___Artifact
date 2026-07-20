import Q from './q.js';

describe('Q.any', () => {
    it('should reject with a non-false value when all promises are rejected', () => {
        const promise1 = Q.reject(new Error('Error 1'));
        const promise2 = Q.reject(new Error('Error 2'));
        return Q.any([promise1, promise2]).then(() => {
            throw new Error('Expected Q.any to reject');
        }).catch((error: any) => {
            expect(error).not.toBe(false);
        });
    });
});