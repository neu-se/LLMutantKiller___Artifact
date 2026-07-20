import { Q } from "../../../../../q.js";

describe('Q.any', () => {
    it('should reject if all promises are rejected', () => {
        const promise1 = Q.reject('error1');
        const promise2 = Q.delay(100).then(() => Q.reject('error2'));
        const promise3 = Q.delay(50).then(() => Q.reject('error3'));

        return Q.any([promise1, promise2, promise3]).then((value: any) => {
            expect(true).toBe(false); // Should not reach here
        }).catch((error: any) => {
            expect(error.message).toBe("Q can't get fulfillment value from any promise, all promises were rejected. Last error message: error2");
        });
    });
});