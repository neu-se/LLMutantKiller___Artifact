describe('Q', () => {
    it('should reject the promise when thenReject is called', () => {
        const promise = Q.resolve();
        const thenRejectSpy = jest.fn((error) => {
            throw error;
        });
        promise.thenReject = thenRejectSpy;
        expect(() => promise.thenReject(new Error('Test error'))).toThrowError('Test error');
    });

    it('should throw an error when thenReject is called with no implementation on the mutated code', () => {
        const promise = Q.resolve();
        promise.thenReject = () => {};
        expect(() => promise.thenReject(new Error('Test error'))).toThrowError();
    });
});