import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should set hasStacks to true when an error is thrown and then reset it', () => {
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