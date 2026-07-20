import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should correctly handle stack traces', () => {
        const error = new Error('test error');
        error.stack = 'Error: test error\n    at getFileNameAndLineNumber (q.js:123:45)\n    at isInternalFrame (q.js:456:67)';
        const lines = error.stack.split('\n');
        const attempt1 = /at.+ \((.+):(\d+):(?:\d+)\)$/.exec(lines[1]);
        if (attempt1) {
            expect(attempt1[1]).toBe('q.js');
            expect(Number(attempt1[2])).toBe(123);
        }
    });
});