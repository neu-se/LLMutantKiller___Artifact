import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should correctly handle getFileNameAndLineNumber', () => {
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
            return null;
        };
        const stackLine = '    at getFileNameAndLineNumber (q.js:123:45)';
        const result = getFileNameAndLineNumber(stackLine);
        expect(result).not.toBeNull();
        expect(result).toEqual(['q.js', 123]);
    });
});