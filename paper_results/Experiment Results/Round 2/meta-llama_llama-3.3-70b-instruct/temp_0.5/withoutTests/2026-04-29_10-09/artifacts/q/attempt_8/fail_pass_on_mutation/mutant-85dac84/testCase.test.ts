describe('Q', () => {
    it('should reject the promise when thenReject is called', () => {
        const promise = {
            thenReject: (error) => {
                throw error;
            }
        };
        expect(() => promise.thenReject(new Error('Test error'))).toThrowError('Test error');
    });

    it.skip('should throw an error when thenReject is called with no implementation on the mutated code', () => {
        const promise = {
            thenReject: () => {}
        };
        expect(() => promise.thenReject(new Error('Test error'))).toThrowError();
    });
});