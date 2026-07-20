import q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q.all', () => {
    it('should resolve with an array of values when all promises are fulfilled', async () => {
        const promise1 = q(1);
        const promise2 = q(2);
        const promise3 = q(3);

        const result = await q.all([promise1, promise2, promise3]);
        expect(result).toEqual([1, 2, 3]);

        const promises = [promise1, promise2, promise3];
        let count = 0;
        for (let i = 0; i < promises.length; i++) {
            const promise = promises[i];
            promise.then(() => {
                count++;
            });
        }
        await new Promise(resolve => setTimeout(resolve, 10));
        expect(count).toBe(3);
    });
});