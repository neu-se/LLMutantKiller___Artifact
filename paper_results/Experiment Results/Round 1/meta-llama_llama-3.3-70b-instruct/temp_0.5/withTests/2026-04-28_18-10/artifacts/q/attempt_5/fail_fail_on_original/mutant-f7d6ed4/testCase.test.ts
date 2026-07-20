describe('Q', () => {
    it('should check if process.domain is truthy when calling done', () => {
        const originalProcessDomain = (global as any).process.domain;
        (global as any).process.domain = {};
        const promise = Q.resolve();
        const onUnhandledError = jest.fn();
        Q.onerror = onUnhandledError;
        promise.done();
        expect(onUnhandledError).toHaveBeenCalledTimes(0);
        (global as any).process.domain = null;
        const promise2 = Q.resolve();
        promise2.done();
        expect(onUnhandledError).toHaveBeenCalledTimes(1);
        (global as any).process.domain = originalProcessDomain;
    });
});