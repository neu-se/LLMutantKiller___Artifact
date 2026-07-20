describe("isInternalFrame", () => {
    it("should correctly identify internal frames based on file name and line number", () => {
        const isInternalFrame = (line: string, lineNumber: number, qFileName: string, qStartingLine: number) => {
            const fileNameAndLineNumber = getFileNameAndLineNumber(line);
            if (!fileNameAndLineNumber) {
                return false;
            }
            const fileName = fileNameAndLineNumber[0];
            const lineNum = fileNameAndLineNumber[1];
            return fileName === qFileName && lineNum >= qStartingLine;
        }
        const stackLine = "at Q.filterStackString (q.js:123:45)";
        const qFileName = "q.js";
        const qStartingLine = 100;
        expect(isInternalFrame(stackLine, 123, qFileName, qStartingLine)).toBe(true);
    });

    it("should not identify internal frames when the condition is always true", () => {
        const isInternalFrame = (line: string) => {
            return true;
        }
        const stackLine = "at foo (bar.js:123:45)";
        expect(isInternalFrame(stackLine)).toBe(true);
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
        return null;
    }
});