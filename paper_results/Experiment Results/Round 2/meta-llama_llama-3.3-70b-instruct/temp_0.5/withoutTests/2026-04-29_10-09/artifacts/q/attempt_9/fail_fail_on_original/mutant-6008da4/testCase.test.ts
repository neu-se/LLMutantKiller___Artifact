import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should use a fallback for nextTick when not in a Node.js environment', () => {
        // Act
        const originalProcess = global.process;
        delete global.process;

        // Assert
        expect(Q.nextTick.toString()).not.toContain('process.nextTick');

        // Clean up
        global.process = originalProcess;
    });
});