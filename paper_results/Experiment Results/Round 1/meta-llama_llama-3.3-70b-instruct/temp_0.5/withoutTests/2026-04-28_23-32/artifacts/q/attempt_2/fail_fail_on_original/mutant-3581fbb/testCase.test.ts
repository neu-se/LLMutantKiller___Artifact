import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should filter out internal and Node.js frames from stack traces', () => {
        const error = new Error();
        const stack = error.stack;
        const filteredStack = Q.filterStackString(stack);
        const lines = filteredStack.split('\n');

        // The mutation changes the condition to include Node.js frames
        // So, if the mutation is present, it should not filter out Node.js frames
        // We can test this by checking if the filtered stack includes a line with 'node:internal'
        expect(lines.some(line => line.includes('node:internal'))).toBe(false);
    });
});