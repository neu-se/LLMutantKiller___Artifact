import q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q.all', () => {
    it('should resolve with an array of values when all promises are fulfilled', async () => {
        const promise1 = q(1);
        const promise2 = q(2);
        const promise3 = q(3);

        const promises = [promise1, promise2, promise3];
        let pendingCount = promises.length;
        const result = await q.all(promises);
        expect(result).toEqual([1, 2, 3]);
        promises.forEach(p => {
            p.then(() => {
                pendingCount--;
            });
        });
        await new Promise(resolve => setTimeout(resolve, 10));
        expect(pendingCount).toBe(0);
    });
});