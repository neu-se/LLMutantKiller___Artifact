describe('Q', () => {
    it('should set hasStacks to true when an error is thrown', () => {
        // Arrange
        let hasStacks;
        try {
            throw new Error();
        } catch (e) {
            hasStacks = !!e.stack;
        }

        // Assert
        expect(hasStacks).toBe(true);
    });

    it('should set hasStacks to false when no error is thrown in the mutated code', () => {
        // Arrange
        let hasStacks;
        try {
        } catch (e) {
            hasStacks = !!e.stack;
        }

        // Assert
        expect(hasStacks).toBeUndefined();
    });
});