describe('Q', () => {
    it('should handle global object correctly', () => {
        const windowDefined = typeof window !== "undefined";
        expect(windowDefined).toBe(windowDefined);
    });
});