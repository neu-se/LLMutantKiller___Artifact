import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle stack traces correctly', () => {
        const error = new Error('Test error');
        error.stack = 'Error: Test error\n    at foo (file:///path/to/file.js:10:12)\n    at bar (file:///path/to/file.js:20:12)';
        const promise = Q.reject(error);
        return promise.catch((err: any) => {
            const stackLines = err.stack.split('\n');
            expect(stackLines.length).toBeGreaterThan(1);
            expect(stackLines[0]).toContain('Error: Test error');
            expect(stackLines[1]).toContain('at foo');
            expect(stackLines[2]).toContain('at bar');
            expect(getFileNameAndLineNumber(stackLines[1])).toEqual(['file:///path/to/file.js', 10]);
        });
    });
});

function getFileNameAndLineNumber(stackLine: string) {
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
    return [null, null];
}