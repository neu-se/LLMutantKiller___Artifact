describe('Q', () => {
    it('should handle setImmediate correctly', () => {
        const condition = typeof setImmediate === 'function';
        expect(condition).toBe(true);
        if (condition) {
            expect(typeof setImmediate).toBe('function');
        } else {
            expect(typeof setTimeout).toBe('function');
        }
    });
});