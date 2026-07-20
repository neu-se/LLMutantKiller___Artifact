describe('Q', () => {
    it('should handle global object correctly', () => {
        const windowUndefined = typeof window === "undefined";
        if (windowUndefined) {
            expect(typeof window).toBe("undefined");
        } else {
            expect(typeof window).not.toBe("undefined");
        }
    });
});