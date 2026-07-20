import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should use a fallback for nextTick when not in a Node.js environment', () => {
        // Arrange
        const originalProcess = global.process;
        delete global.process;

        // Act
        const q = Q();

        // Assert
        expect(q.nextTick.toString()).toContain('setTimeout');

        // Clean up
        global.process = originalProcess;
    });
});