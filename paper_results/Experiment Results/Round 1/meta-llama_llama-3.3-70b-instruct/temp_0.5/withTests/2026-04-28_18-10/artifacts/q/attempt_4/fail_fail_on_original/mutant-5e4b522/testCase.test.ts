describe('Q', () => {
    it('should handle global object correctly', () => {
        const globalObject = typeof window !== "" ? window : typeof self !== "undefined" ? self : global;
        expect(typeof globalObject).not.toBe("string");
    });
});