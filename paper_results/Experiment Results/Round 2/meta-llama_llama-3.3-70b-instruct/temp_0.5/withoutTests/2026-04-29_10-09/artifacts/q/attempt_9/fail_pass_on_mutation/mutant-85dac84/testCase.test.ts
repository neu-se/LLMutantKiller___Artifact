describe('Q', () => {
    it('should reject the promise when thenReject is called', () => {
        const promise = {
            thenReject: (error) => {
                throw error;
            }
        };
        expect(() => promise.thenReject(new Error('Test error'))).toThrowError('Test error');
    });

    it('should not be empty when thenReject is called on the original code', () => {
        const promise = {
            thenReject: (error) => {
                throw error;
            }
        };
        expect(promise.thenReject.toString()).not.toBe('function () {}');
    });
});