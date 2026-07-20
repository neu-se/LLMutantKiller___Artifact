import { Q } from "./q";

describe('Q', () => {
    it('should filter out internal and Node.js frames from stack traces', () => {
        const error = new Error();
        const stack = error.stack;
        const filteredStack = Q.filterStackString(stack);
        const lines = filteredStack.split('\n');

        // The original code filters out Node.js frames and internal frames
        // The mutated code filters out internal frames but not Node.js frames
        // So, the test should pass for the original code and fail for the mutated code
        const isNodeFrame = lines.some(line => line.includes('node:internal'));
        const isInternalFrame = lines.some(line => line.includes('q.js'));

        expect(isNodeFrame).toBe(false);
        expect(isInternalFrame).toBe(false);
    });
});