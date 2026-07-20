describe('Q promise', () => {
    it('should call the resolver function', async () => {
        const resolver = jest.fn();
        const Q = {
            promise: (resolver) => {
                resolver();
            }
        };
        Q.promise(resolver);
        expect(resolver).toHaveBeenCalledTimes(1);
    });
});