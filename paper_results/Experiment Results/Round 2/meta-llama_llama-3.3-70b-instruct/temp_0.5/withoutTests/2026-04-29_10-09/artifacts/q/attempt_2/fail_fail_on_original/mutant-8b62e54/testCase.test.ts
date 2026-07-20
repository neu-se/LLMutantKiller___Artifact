import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.any', () => {
    it('should reject with a meaningful error message when all promises are rejected', async () => {
        const promise1 = Q.reject('error1');
        const promise2 = Q.reject('error2');
        const promise3 = Q.reject('error3');

        await expect(Q.any([promise1, promise2, promise3])).rejects.toThrow();
    });
});