import { Q } from "../../../q.js";

describe('Q.any', () => {
    it('should reject if all promises are rejected', (done) => {
        const promise1 = Q.reject('first');
        const promise2 = Q.reject('second');
        const promise3 = Q.reject('third');
        Q.any([promise1, promise2, promise3]).then(() => {
            expect(true).toBe(false); // should not reach here
            done();
        }).catch((error: any) => {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toContain('Q can\'t get fulfillment value from any promise, all promises were rejected');
            done();
        });
    });
});