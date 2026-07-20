describe('q.js behavior', () => {
    it('should not throw an error when hasStacks is false', () => {
        // Arrange
        let originalHasStacks = (Q as any).hasStacks;
        (Q as any).hasStacks = false;

        // Act and Assert
        expect(() => {
            (Q as any).captureLine();
        }).not.toThrow();

        // Cleanup
        (Q as any).hasStacks = originalHasStacks;
    });
});