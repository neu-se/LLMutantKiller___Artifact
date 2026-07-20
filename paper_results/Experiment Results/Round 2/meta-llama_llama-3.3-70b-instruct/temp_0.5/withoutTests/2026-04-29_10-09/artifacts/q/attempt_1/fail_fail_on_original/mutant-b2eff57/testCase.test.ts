import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.any', () => {
    it('should reject with the last error message when all promises are rejected', () => {
        const promise1 = Q.reject('Error 1');
        const promise2 = Q.reject('Error 2');
        return Q.any([promise1, promise2]).then(() => {
            throw new Error('Expected Q.any to reject');
        }).catch((error: any) => {
            expect(error.message).toBe('Q can\'t get fulfillment value from any promise, all promises were rejected. Last error message: Error 2');
        });
    });
});