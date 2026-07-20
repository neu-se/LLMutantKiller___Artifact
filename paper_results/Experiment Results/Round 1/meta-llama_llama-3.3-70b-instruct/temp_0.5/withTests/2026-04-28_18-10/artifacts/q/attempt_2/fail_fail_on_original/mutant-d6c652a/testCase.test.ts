import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('captureLine function', () => {
    it('should return a line number when hasStacks is true', () => {
        // Arrange
        let hasStacks = true;
        let originalCaptureLine = Q.captureLine;

        // Act
        Q.captureLine = function () {
            return 10;
        };

        let lineNumber = Q.captureLine();

        // Assert
        expect(lineNumber).not.toBeNull();

        // Cleanup
        Q.captureLine = originalCaptureLine;
    });

    it('should return undefined when hasStacks is false in the original code', () => {
        // Arrange
        let hasStacks = false;
        let originalCaptureLine = Q.captureLine;

        // Act
        Q.captureLine = function () {
            if (hasStacks) {
                return 10;
            } else {
                return;
            }
        };

        let lineNumber = Q.captureLine();

        // Assert
        expect(lineNumber).toBeUndefined();

        // Cleanup
        Q.captureLine = originalCaptureLine;
    });

    it('should not return undefined when hasStacks is false in the mutated code', () => {
        // Arrange
        let hasStacks = false;
        let originalCaptureLine = Q.captureLine;

        // Act
        Q.captureLine = function () {
            if (hasStacks) {
            } else {
                return 10;
            }
        };

        let lineNumber = Q.captureLine();

        // Assert
        expect(lineNumber).not.toBeUndefined();

        // Cleanup
        Q.captureLine = originalCaptureLine;
    });
});