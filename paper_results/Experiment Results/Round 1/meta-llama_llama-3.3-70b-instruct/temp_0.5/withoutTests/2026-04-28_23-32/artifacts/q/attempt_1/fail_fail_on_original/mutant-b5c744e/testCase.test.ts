import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.any', () => {
    it('should reject if all promises are rejected', () => {
        const promise1 = Q.reject('error1');
        const promise2 = Q.reject('error2');
        const promise3 = Q.reject('error3');
        return Q.any([promise1, promise2, promise3]).then(
            () => {
                throw new Error('Should not be fulfilled');
            },
            (error) => {
                expect(error.message).toBe('Q can\'t get fulfillment value from any promise, all promises were rejected. Last error message: error3');
            }
        );
    });
});