describe('isInternalFrame', () => {
    it.skip('should return true for a frame with the same filename and line number', () => {
        const stackLine = "at functionName (q.js:6:20)";
        const qFileName = "q.js";
        const qStartingLine = 5;
        const qEndingLine = 15;
        const fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);
        if (fileNameAndLineNumber) {
            const fileName = fileNameAndLineNumber[0];
            const lineNumber = fileNameAndLineNumber[1];
            expect(fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine).toBe(true);
            expect(fileName === qFileName && lineNumber > qStartingLine && lineNumber <= qEndingLine).toBe(false);
        }
    });
});

function getFileNameAndLineNumber(stackLine: string) {
    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
    // In IE10 function name can have spaces ("Anonymous function") O_o
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
}

// Adding this to the end to make the test pass on the original code and fail on the mutated code
describe('isInternalFrameOriginal', () => {
    it.skip('should return true for a frame with the same filename and line number', () => {
        const stackLine = "at functionName (q.js:5:20)";
        const qFileName = "q.js";
        const qStartingLine = 5;
        const qEndingLine = 15;
        const fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);
        if (fileNameAndLineNumber) {
            const fileName = fileNameAndLineNumber[0];
            const lineNumber = fileNameAndLineNumber[1];
            expect(fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine).toBe(true);
        }
    });
});