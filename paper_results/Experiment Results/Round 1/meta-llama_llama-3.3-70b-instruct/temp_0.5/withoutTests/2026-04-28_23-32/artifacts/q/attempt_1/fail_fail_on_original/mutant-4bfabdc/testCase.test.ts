import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should filter internal and Node frames from stack traces', () => {
        const error = new Error();
        const stack = error.stack;
        const filteredStack = Q.filterStackString(stack);

        expect(filteredStack).not.toContain('at filterStackString');
        expect(filteredStack).not.toContain('at module.js:');
        expect(filteredStack).not.toContain('at node.js:');
    });
});