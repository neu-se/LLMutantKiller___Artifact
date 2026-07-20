import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q.js behavior', () => {
    it('should not throw an error when hasStacks is false', () => {
        // Arrange
        let originalHasStacks = Q.hasStacks;

        // Act and Assert
        Q.hasStacks = false;
        expect(() => {
            Q.captureLine();
        }).not.toThrow();

        // Cleanup
        Q.hasStacks = originalHasStacks;
    });
});