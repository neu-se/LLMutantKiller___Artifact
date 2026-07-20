import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should filter out internal and Node.js frames from stack traces', () => {
        const error = new Error();
        const stack = error.stack;
        const filteredStack = Q.filterStackString(stack);
        const lines = filteredStack.split('\n');

        // The original code filters out Node.js frames and internal frames
        // The mutated code filters out internal frames but not Node.js frames
        // So, the test should pass for the original code and fail for the mutated code
        const isInternalFrame = lines.some(line => line.includes('q.js'));

        expect(isInternalFrame).toBe(false);
        const nodeFrameCountOriginal = lines.filter(line => line.includes('node:internal')).length;
        expect(nodeFrameCountOriginal).toBe(0);
        // Add a Node.js frame to the stack trace
        const newStack = stack + '\n    at node:internal/process/next_tick.js:68:7';
        const newFilteredStack = Q.filterStackString(newStack);
        const newLines = newFilteredStack.split('\n');
        const newNodeFrameCountOriginal = newLines.filter(line => line.includes('node:internal')).length;
        expect(newNodeFrameCountOriginal).toBe(0);
    });
});