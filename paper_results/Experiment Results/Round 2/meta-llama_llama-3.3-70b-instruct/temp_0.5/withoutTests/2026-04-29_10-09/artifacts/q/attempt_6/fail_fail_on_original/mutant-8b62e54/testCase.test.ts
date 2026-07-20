import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.any', () => {
    it('should reject when all promises are rejected and no promises are resolved', async () => {
        const promise1 = Q.reject('error1');
        const promise2 = Q.reject('error2');

        await expect(Q.any([promise1, promise2])).rejects.not.toEqual(undefined);
    });
});