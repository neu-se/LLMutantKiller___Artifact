import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not consider itself as a Node.js environment by default', () => {
        // Arrange
        const originalProcess = global.process;
        delete global.process;

        // Act
        const q = Q();

        // Assert
        expect(q.nextTick.requestTick.toString()).not.toContain('process.nextTick');

        // Clean up
        global.process = originalProcess;
    });
});