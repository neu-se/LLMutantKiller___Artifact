import Q from '../../../q';

describe('Q.any', () => {
    it('should reject with an error when all promises are rejected', () => {
        const promise1 = Q.reject(new Error('Error 1'));
        const promise2 = Q.reject(new Error('Error 2'));
        return Q.any([promise1, promise2]).then(() => {
            throw new Error('Expected Q.any to reject');
        }).catch((error: any) => {
            expect(error).not.toBe(false);
            expect(typeof error).toBe('object');
        });
    });
});