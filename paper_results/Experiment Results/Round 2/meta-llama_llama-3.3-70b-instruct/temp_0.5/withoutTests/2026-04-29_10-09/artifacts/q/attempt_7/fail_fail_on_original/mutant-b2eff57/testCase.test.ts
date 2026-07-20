import { Q } from "./q.js";

describe('Q.any', () => {
    it('should reject with an error when all promises are rejected and the last promise is null', () => {
        const promise1 = Q.reject('Error 1');
        const promise2 = Q.reject(null);
        return Q.any([promise1, promise2]).then(() => {
            throw new Error('Expected Q.any to reject');
        }).catch((error: any) => {
            expect(error.message).toBe('Q can\'t get fulfillment value from any promise, all promises were rejected. Last error message: Error 1');
        });
    });
});