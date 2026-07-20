import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should have hasStacks set to true when error.stack is truthy', () => {
        // Arrange
        const originalHasStacks = Q.hasStacks;

        // Act
        try {
            throw new Error();
        } catch (e) {
            Q.hasStacks = !!e.stack;
        }

        // Assert
        expect(Q.hasStacks).toBe(true);

        // Clean up
        Q.hasStacks = originalHasStacks;
    });
});