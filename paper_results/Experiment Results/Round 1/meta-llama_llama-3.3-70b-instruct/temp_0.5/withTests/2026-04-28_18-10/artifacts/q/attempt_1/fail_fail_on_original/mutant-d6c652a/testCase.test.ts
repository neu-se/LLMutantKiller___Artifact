import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('captureLine function', () => {
    it('should return a line number when hasStacks is true', () => {
        // Arrange
        let hasStacks = true;

        // Act
        let lineNumber = Q.captureLine();

        // Assert
        expect(lineNumber).not.toBeNull();
    });

    it('should return undefined when hasStacks is false', () => {
        // Arrange
        let hasStacks = false;

        // Act
        let lineNumber = Q.captureLine();

        // Assert
        expect(lineNumber).toBeUndefined();
    });
});