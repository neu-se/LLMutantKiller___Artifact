import { Q } from "../q";

describe('Q.any', () => {
    it('should reject if all promises are rejected', () => {
        const promise1 = Q.reject('error1');
        const promise2 = Q.reject('error2');
        const promise3 = Q.reject('error3');
        return Q.any([promise1, promise2, promise3]).then(
            (result: any) => {
                expect(result).toBeUndefined();
            },
            (error: any) => {
                expect(error.message).toBe('Q can\'t get fulfillment value from any promise, all promises were rejected. Last error message: error3');
            }
        );
    });
});