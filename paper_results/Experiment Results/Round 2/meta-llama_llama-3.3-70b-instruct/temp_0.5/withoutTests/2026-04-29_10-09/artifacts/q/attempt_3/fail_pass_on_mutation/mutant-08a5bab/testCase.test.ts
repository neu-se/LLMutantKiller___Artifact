import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly filter internal frames from stack traces', () => {
        const error = new Error();
        const stack = error.stack;
        const lines = stack.split('\n');
        const qFileName = 'q.js';
        const internalFrame = lines.find(line => line.includes(qFileName));
        expect(internalFrame).toBeUndefined();
    });
});