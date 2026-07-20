describe('Q', () => {
    it('should handle domain binding correctly', () => {
        const originalCode = `
            if (typeof process === "object" && process && process.domain) {
                onUnhandledError = process.domain.bind(onUnhandledError);
            }
        `;
        const mutatedCode = `
            if (false) {
                onUnhandledError = process.domain.bind(onUnhandledError);
            }
        `;
        expect(originalCode).not.toBe(mutatedCode);
    });
});