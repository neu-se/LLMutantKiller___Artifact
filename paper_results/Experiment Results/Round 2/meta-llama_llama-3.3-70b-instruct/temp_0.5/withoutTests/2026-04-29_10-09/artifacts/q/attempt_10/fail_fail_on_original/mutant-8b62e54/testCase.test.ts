describe('Q.any', () => {
    it('should resolve when at least one promise is resolved', async () => {
        const promise1 = Q.reject('error1');
        const promise2 = Q.resolve('success');

        await expect(Q.any([promise1, promise2])).resolves.toEqual('success');
    });

    it('should not reject when all promises are rejected in the mutated code', async () => {
        const promise1 = Q.reject('error1');
        const promise2 = Q.reject('error2');

        try {
            await Q.any([promise1, promise2]);
            // If Q.any does not reject, the test passes
        } catch (error) {
            // If Q.any rejects, the test fails
            throw new Error('Q.any should not reject when all promises are rejected in the mutated code');
        }
    }, 20000);
});