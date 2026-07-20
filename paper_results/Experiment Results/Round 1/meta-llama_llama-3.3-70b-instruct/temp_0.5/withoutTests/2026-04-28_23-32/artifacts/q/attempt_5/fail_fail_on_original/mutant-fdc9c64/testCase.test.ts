import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly filter stack traces', () => {
        const error = new Error();
        const stack = error.stack;
        const lines = stack?.split('\n');
        const filteredStack = Q.filterStackString(stack);
        const internalFrame = lines?.find(line => line.includes('isInternalFrame'));
        expect(filteredStack).not.toContain(internalFrame);
    });
});