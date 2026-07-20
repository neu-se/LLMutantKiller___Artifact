describe("Q", () => {
    it("should handle process.emit correctly", () => {
        // Check if process.emit is a function and can be called with 'unhandledRejection'
        expect(typeof process.emit).toBe('function');
        expect(() => process.emit('unhandledRejection', new Error('test'))).not.toThrow();
    });
});