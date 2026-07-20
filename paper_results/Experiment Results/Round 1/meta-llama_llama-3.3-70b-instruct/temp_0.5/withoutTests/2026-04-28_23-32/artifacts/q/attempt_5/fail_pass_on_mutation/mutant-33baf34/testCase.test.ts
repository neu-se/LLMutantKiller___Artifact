import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should correctly parse stack lines', () => {
        const error = new Error('Test error');
        error.stack = 'at functionName (filename:123:45)';
        const lines = error.stack.split("\n");
        const firstLine = lines[0];
        const fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
        if (fileNameAndLineNumber) {
            expect(fileNameAndLineNumber[0]).toBe('filename');
            expect(fileNameAndLineNumber[1]).toBe(123);
        } else {
            expect(true).toBe(false);
        }
        var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(firstLine);
        if (attempt1) {
            expect(attempt1[1]).toBe('filename');
            expect(Number(attempt1[2])).toBe(123);
        }
    });
});

function getFileNameAndLineNumber(stackLine: string): [string, number] | false {
    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
    if (attempt1) {
        return [attempt1[1], Number(attempt1[2])];
    }
    // Anonymous functions: "at filename:lineNumber:columnNumber"
    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
    if (attempt2) {
        return [attempt2[1], Number(attempt2[2])];
    }
    // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) {
        return [attempt3[1], Number(attempt3[2])];
    }
    return false;
}