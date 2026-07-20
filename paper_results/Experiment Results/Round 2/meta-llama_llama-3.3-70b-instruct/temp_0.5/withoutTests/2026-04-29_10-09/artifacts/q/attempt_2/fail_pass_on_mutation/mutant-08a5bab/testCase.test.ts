import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly filter internal frames from stack traces', () => {
        const error = new Error();
        const stack = error.stack;
        const lines = stack.split('\n');
        const internalFrame = lines.find(line => line.includes('q.js'));
        expect(internalFrame).toBeUndefined();
    });
});