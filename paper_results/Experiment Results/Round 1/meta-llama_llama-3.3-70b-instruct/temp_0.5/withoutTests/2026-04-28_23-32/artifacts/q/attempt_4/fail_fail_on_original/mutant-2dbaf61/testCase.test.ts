import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should set hasStacks to false when no error is thrown', () => {
        // Arrange
        const originalHasStacks = Q.hasStacks;

        // Act
        try {
        } catch (e) {
            Q.hasStacks = !!e.stack;
        }

        // Assert
        expect(Q.hasStacks).toBe(false);

        // Clean up
        Q.hasStacks = originalHasStacks;
    });
});