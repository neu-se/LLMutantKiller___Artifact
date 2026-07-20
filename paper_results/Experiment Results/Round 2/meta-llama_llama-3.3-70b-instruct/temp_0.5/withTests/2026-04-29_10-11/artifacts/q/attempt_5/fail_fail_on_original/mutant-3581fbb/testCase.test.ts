import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('error stack filtering', () => {
    it('should filter out internal frames but include node frames when isNodeFrame returns true', () => {
        const error = new Error('Test error');
        const originalStack = error.stack;

        // Mock isInternalFrame and isNodeFrame functions
        const originalIsInternalFrame = Q.isInternalFrame;
        const originalIsNodeFrame = Q.isNodeFrame;
        Q.isInternalFrame = (line: string) => false;
        Q.isNodeFrame = (line: string) => true;

        const filteredStack = Q.filterStackString(originalStack);

        expect(filteredStack).toContain('node:');

        // Restore original functions
        Q.isInternalFrame = originalIsInternalFrame;
        Q.isNodeFrame = originalIsNodeFrame;
    });
});