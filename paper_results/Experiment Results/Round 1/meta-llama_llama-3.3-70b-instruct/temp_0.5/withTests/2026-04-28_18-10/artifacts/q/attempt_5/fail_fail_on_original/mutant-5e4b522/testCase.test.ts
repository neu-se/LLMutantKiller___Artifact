describe('Q', () => {
    it('should handle global object correctly', () => {
        const isWindowDefined = typeof window !== "undefined";
        const isSelfDefined = typeof self !== "undefined";
        expect(isWindowDefined || isSelfDefined).toBe(true);
    });
});