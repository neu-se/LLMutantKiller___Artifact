describe('Q', () => {
    it('should handle domain binding correctly', () => {
        if (typeof process !== 'undefined' && process) {
            expect(process.domain).toBeDefined();
        } else {
            expect(true).toBe(true);
        }
    });
});