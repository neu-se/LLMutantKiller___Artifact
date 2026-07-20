import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should filter out internal frames from stack traces', () => {
        const error = new Error();
        const stack = error.stack;
        const lines = stack.split('\n');
        const internalFrame = lines.find(line => line.includes('q.js'));
        const filteredStack = Q.filterStackString(stack);
        const filteredLines = filteredStack.split('\n');
        expect(filteredLines.includes(internalFrame)).toBe(false);
    });
});