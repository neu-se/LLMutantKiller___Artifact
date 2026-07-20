import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.any', () => {
    it('should reject if all promises are rejected', (done) => {
        const promise1 = Q.reject('first');
        const promise2 = Q.reject('second');
        const promise3 = Q.reject('third');
        Q.any([promise1, promise2, promise3]).then((value) => {
            expect(true).toBe(false); // should not reach here
            done();
        }).catch((error) => {
            expect(error.message).toBe("Q can't get fulfillment value from any promise, all promises were rejected. Last error message: third");
            done();
        });
    });
});