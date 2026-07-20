import { Q } from "./q";

describe('Q', () => {
    it('should filter out internal and Node.js frames from stack traces', () => {
        const error = new Error();
        const stack = error.stack;
        const filteredStack = Q.filterStackString(stack);
        const lines = filteredStack.split('\n');

        // The original code filters out Node.js frames
        // The mutated code does not filter out Node.js frames
        // So, the test should pass for the original code and fail for the mutated code
        expect(lines.some(line => line.includes('node:internal'))).toBe(false);
    });
});