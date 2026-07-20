import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.any', () => {
    it('should resolve when at least one promise is resolved', async () => {
        const promise1 = Q.reject('error1');
        const promise2 = Q.resolve('success');

        await expect(Q.any([promise1, promise2])).resolves.toEqual('success');
    });
});