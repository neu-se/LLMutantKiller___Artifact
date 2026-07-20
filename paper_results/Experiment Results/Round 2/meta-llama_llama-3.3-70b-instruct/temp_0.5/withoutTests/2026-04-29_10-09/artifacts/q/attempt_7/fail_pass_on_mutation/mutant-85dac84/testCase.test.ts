describe('Q', () => {
    it('should reject the promise when thenReject is called', () => {
        const promise = {
            thenReject: (error) => {
                throw error;
            }
        };
        expect(() => promise.thenReject(new Error('Test error'))).toThrowError('Test error');
    });

    it('should not reject the promise when thenReject is called with no implementation', () => {
        const promise = {
            thenReject: () => {}
        };
        expect(() => promise.thenReject()).not.toThrowError();
    });
});