import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.any', () => {
    it('should reject with a boolean value of false when all promises are rejected in the mutated code', () => {
        const promise1 = Q.reject(new Error('Error 1'));
        const promise2 = Q.reject(new Error('Error 2'));
        return Q.any([promise1, promise2]).then(() => {
            throw new Error('Expected Q.any to reject');
        }).catch((error: any) => {
            expect(error).toBe(false);
        });
    });
});