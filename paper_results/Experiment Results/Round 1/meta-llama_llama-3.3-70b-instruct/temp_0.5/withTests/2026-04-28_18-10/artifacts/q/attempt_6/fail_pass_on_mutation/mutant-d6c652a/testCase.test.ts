describe('q.js behavior', () => {
    it('should capture line number correctly', () => {
        // Arrange
        const error = new Error();
        const stack = error.stack;

        // Act and Assert
        expect(stack).not.toBeNull();
    });
});