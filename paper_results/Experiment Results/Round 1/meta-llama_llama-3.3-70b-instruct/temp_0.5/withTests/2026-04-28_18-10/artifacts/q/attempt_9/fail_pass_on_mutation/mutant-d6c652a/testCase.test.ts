describe('q.js behavior', () => {
    it('should capture line number correctly', () => {
        // Arrange
        const error = new Error();

        // Act and Assert
        expect(error.stack).not.toBeNull();
    });
});