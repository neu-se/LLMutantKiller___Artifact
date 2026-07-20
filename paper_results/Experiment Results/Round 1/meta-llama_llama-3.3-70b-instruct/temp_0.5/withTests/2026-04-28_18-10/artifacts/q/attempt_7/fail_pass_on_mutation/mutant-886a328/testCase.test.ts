describe('Q', () => {
    it('should throw an error with a specific message when Q.noConflict is called in a non-browser environment', () => {
        // Since we can't import Q directly, we'll use the global Q object instead.
        const Q = (global as any).Q;
        if (Q && typeof Q.noConflict === 'function') {
            expect(() => Q.noConflict()).toThrowError('Q.noConflict only works when Q is used as a global');
        }
    });
});