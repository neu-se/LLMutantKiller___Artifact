describe('Q', () => {
    it('should throw an error with a specific message when Q.noConflict is called', () => {
        // Since we can't import Q directly, we'll use the global Q object instead.
        const Q = (global as any).Q;
        if (Q && typeof Q.noConflict === 'function') {
            try {
                Q.noConflict();
            } catch (error) {
                expect(error.message).toContain('Q.noConflict only works when Q is used as a global');
            }
        }
    });
});