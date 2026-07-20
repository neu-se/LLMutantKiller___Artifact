import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should correctly filter stack traces', () => {
        const error = new Error();
        const stack = error.stack;
        const lines = stack.split('\n');
        const filteredStack = Q.filterStackString(stack);
        expect(filteredStack).not.toContain('isInternalFrame');
    });
});