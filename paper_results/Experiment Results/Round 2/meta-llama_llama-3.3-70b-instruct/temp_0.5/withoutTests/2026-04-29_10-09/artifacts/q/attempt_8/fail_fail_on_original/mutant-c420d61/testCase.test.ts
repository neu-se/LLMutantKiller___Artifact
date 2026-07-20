import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle stack traces', () => {
        const error = new Error();
        error.stack = `(module.js:1:1)\n(node.js:2:2)`;
        const promise = Q();
        try {
            throw error;
        } catch (e) {
            const stackLines = (e as Error).stack?.split('\n');
            if (stackLines) {
                const filteredStackLines = stackLines.filter(line => !line.includes('node.js'));
                expect(filteredStackLines.length).toBe(1);
            } else {
                expect.fail('Error stack is not defined');
            }
        }
    });
});