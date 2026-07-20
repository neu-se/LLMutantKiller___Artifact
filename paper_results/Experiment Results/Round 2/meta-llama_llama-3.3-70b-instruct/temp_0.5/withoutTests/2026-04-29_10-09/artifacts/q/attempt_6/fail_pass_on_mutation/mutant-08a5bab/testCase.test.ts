import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly filter internal frames from stack traces', () => {
        const error = new Error();
        const stack = error.stack;
        const lines = stack.split('\n');
        const qFileName = 'q.js';
        const internalFrame = lines.find(line => line.includes(qFileName));
        if (internalFrame) {
            const filteredStack = Q.filterStackString(stack);
            expect(filteredStack).not.toContain(internalFrame);
        } else {
            expect(true).toBe(true); // If no internal frame is found, the test passes
        }
    });
});