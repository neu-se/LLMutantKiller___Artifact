describe('Q', () => {
    it('should handle global object correctly', () => {
        const globalObject = typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : global;
        expect(globalObject).toBeDefined();
    });
});