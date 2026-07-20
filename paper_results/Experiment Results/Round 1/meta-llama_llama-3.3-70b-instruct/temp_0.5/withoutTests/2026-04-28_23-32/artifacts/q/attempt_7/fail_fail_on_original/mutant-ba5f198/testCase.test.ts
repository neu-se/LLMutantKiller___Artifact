describe('Q', () => {
    it('should handle setImmediate correctly', () => {
        // Check if the condition for setImmediate is met
        if (typeof setImmediate === 'function') {
            expect(setImmediate).not.toThrow();
        } else {
            expect(setTimeout).not.toThrow();
        }
    });
});