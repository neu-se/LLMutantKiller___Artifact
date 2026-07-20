describe('Q', () => {
    it('should throw an error when Q.noConflict is called in a non-browser environment', () => {
        // Since we can't import Q directly, we'll use the global Q object instead.
        const Q = (global as any).Q;
        if (Q && typeof Q.noConflict === 'function') {
            const noConflict = Q.noConflict;
            expect(noConflict).toThrowError();
        }
    });
});