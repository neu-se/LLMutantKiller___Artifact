import q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q.all', () => {
    it('should resolve with an array of values when all promises are fulfilled', async () => {
        const promise1 = q.resolve(1);
        const promise2 = q.resolve(2);
        const promise3 = q.resolve(3);

        const result = await q.all([promise1, promise2, promise3]);
        expect(result).toEqual([1, 2, 3]);

        const promises = [promise1, promise2, promise3];
        for (let i = 0; i < promises.length; i++) {
            const promise = promises[i];
            if (promise.inspect().state === "pending") {
                throw new Error("Promise is still pending");
            }
        }
    });
});