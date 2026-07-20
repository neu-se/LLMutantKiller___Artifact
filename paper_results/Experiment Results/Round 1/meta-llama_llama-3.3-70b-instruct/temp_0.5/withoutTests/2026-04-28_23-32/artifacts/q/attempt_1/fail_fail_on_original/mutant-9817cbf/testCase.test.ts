import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.any', () => {
    it('should reject with a meaningful error message when all promises are rejected', () => {
        const promise1 = Q.reject(new Error('Error 1'));
        const promise2 = Q.reject(new Error('Error 2'));
        return Q.any([promise1, promise2]).then(() => {
            throw new Error('Expected Q.any to reject');
        }).catch((error) => {
            expect(error.message).toContain('all promises were rejected');
            expect(error.message).toContain('Last error message: Error 2');
        });
    });
});