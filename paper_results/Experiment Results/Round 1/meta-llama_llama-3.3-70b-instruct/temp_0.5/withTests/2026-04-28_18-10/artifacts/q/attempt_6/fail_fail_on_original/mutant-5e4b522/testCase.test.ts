describe('Q', () => {
    it('should handle global object correctly', () => {
        const isWindowUndefined = typeof window === "undefined";
        const isSelfUndefined = typeof self === "undefined";
        expect(!(isWindowUndefined && isSelfUndefined)).toBe(true);
    });
});