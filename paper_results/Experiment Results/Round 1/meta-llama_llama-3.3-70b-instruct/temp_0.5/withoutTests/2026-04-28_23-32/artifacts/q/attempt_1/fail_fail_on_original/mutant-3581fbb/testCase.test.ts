import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should filter out internal and Node.js frames from stack traces', () => {
        const error = new Error();
        const stack = error.stack;
        const filteredStack = Q.filterStackString(stack);
        const lines = filteredStack.split('\n');
        const hasNodeFrame = lines.some(line => line.includes('node:internal'));
        const hasInternalFrame = lines.some(line => line.includes('q.js'));

        expect(hasNodeFrame).toBe(false);
        expect(hasInternalFrame).toBe(false);
    });
});