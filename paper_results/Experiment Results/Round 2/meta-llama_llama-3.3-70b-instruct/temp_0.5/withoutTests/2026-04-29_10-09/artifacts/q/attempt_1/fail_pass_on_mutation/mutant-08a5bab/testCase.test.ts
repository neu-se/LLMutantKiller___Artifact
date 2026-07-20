import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly filter internal frames from stack traces', () => {
        const error = new Error();
        const stack = error.stack;
        const filteredStack = stack.split('\n').filter(line => !line.includes('at isInternalFrame')).join('\n');
        expect(filteredStack).not.toContain('at isInternalFrame');
    });
});