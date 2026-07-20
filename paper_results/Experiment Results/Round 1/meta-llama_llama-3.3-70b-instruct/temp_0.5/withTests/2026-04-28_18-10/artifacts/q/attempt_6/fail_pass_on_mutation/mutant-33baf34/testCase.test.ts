import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should correctly handle getFileNameAndLineNumber', () => {
        const error = new Error('test error');
        error.stack = 'Error: test error\n    at getFileNameAndLineNumber (q.js:123:45)\n    at isInternalFrame (q.js:456:67)';
        const lines = error.stack.split('\n');
        const attempt1 = /at.+ \((.+):(\d+):(?:\d+)\)$/.exec(lines[1]);
        if (attempt1) {
            expect(attempt1[1]).toBe('q.js');
            expect(Number(attempt1[2])).toBe(123);
        } else {
            expect(false).toBe(true);
        }
        const getFileNameAndLineNumber = function(stackLine) {
            var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
            if (attempt1) {
                return [attempt1[1], Number(attempt1[2])];
            }
            var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
            if (attempt2) {
                return [attempt2[1], Number(attempt2[2])];
            }
            var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
            if (attempt3) {
                return [attempt3[1], Number(attempt3[2])];
            }
            return false;
        };
        const fileNameAndLineNumber = getFileNameAndLineNumber(lines[1]);
        expect(fileNameAndLineNumber).not.toBeNull();
        expect(fileNameAndLineNumber[0]).toBe('q.js');
        expect(fileNameAndLineNumber[1]).toBe(123);
    });
});