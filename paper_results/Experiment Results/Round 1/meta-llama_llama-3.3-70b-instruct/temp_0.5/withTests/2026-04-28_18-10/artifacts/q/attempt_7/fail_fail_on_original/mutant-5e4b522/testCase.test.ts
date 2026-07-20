describe('Q', () => {
    it('should handle global object correctly', () => {
        const globalObject = typeof window !== "undefined" ? window : self;
        expect(typeof globalObject).not.toBe("string");
    });
});