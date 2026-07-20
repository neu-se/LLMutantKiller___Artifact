describe('Q', () => {
    it('should apply the function with the given arguments', async () => {
        const func = jest.fn((a, b) => a + b);
        const promise = Q(func).fapply([1, 2]);
        await expect(promise).resolves.toBe(3);
    });
});