describe('Q', () => {
    it('should check if done works correctly with process.domain', () => {
        const promise = Q.resolve();
        const onUnhandledError = jest.fn();
        Q.onerror = onUnhandledError;
        promise.done();
        expect(onUnhandledError).toHaveBeenCalledTimes(0);
    });
});