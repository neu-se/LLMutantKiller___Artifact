describe('Q', () => {
    it('should throw an error when Q.noConflict is called in a non-browser environment', () => {
        // Since we can't import Q directly, we'll use the global Q object instead.
        if (typeof globalThis.Q === 'undefined') {
            throw new Error('Q is not defined');
        }
        const originalQ = globalThis.Q;
        expect(() => originalQ.noConflict()).toThrowError('Q.noConflict only works when Q is used as a global');
    });
});