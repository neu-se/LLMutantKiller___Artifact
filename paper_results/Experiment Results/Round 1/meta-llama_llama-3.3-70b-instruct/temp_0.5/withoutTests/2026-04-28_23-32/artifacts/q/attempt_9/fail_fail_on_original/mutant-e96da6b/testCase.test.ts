describe('Q.delay', () => {
    it('should delay the resolution of a promise', () => {
        const timeout = 100;
        const promise = Q.delay(Promise.resolve('test'), timeout);
        expect(promise.then).toBeInstanceOf(Function);
        expect(promise.catch).toBeInstanceOf(Function);
    });
});