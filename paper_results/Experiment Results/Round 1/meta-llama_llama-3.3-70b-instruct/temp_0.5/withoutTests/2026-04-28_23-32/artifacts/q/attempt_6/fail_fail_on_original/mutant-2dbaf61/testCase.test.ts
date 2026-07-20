import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when trying to access the stack of a non-error object in the catch block', () => {
        // Arrange
        const originalHasStacks = Q.hasStacks;

        // Act and Assert
        expect(() => {
            try {
            } catch (e) {
                Q.hasStacks = !!e.stack;
            }
        }).toThrowError();

        // Clean up
        Q.hasStacks = originalHasStacks;
    });
});