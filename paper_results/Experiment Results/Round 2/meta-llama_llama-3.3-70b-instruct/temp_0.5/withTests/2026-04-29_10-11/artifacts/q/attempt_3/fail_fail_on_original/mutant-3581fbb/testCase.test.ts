import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('error stack filtering', () => {
    it('should filter out internal frames and node frames by default', () => {
        const error = new Error('Test error');
        const originalStack = error.stack;

        // Mock isInternalFrame and isNodeFrame functions
        const originalIsInternalFrame = Q.isInternalFrame;
        const originalIsNodeFrame = Q.isNodeFrame;
        Q.isInternalFrame = (line: string) => line.includes('q.js');
        Q.isNodeFrame = (line: string) => line.includes('node:');

        const filteredStack = Q.filterStackString(originalStack);

        expect(filteredStack).not.toContain('node:');
        expect(filteredStack).not.toContain('q.js');

        // Restore original functions
        Q.isInternalFrame = originalIsInternalFrame;
        Q.isNodeFrame = originalIsNodeFrame;
    });
});