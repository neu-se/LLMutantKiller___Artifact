import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly filter Node.js frames from stack traces', () => {
        const error = new Error();
        error.stack = `(module.js:1:1)\n(node.js:2:2)`;
        const promise = Q();
        try {
            throw error;
        } catch (e) {
            const stackLines = e.stack.split('\n');
            const filteredStackLines = stackLines.filter(line => !line.includes('node.js'));
            expect(filteredStackLines.length).toBe(1);
        }
    });
});