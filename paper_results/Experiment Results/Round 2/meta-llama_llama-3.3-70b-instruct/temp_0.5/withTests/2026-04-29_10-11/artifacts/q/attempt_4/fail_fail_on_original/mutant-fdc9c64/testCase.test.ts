describe("Q", () => {
    it("should correctly handle isInternalFrame", () => {
        const qFileName = "q.js";
        const qStartingLine = 50;
        const qEndingLine = 150;

        const getFileNameAndLineNumber = (stackLine: string) => {
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
            return [null, null];
        };

        const isInternalFrame = (stackLine: string) => {
            const fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);
            if (!fileNameAndLineNumber) {
                return false;
            }
            const [fileName, lineNumber] = fileNameAndLineNumber;
            return fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine;
        };

        const filterStackString = (stackString: string) => {
            const lines = stackString.split("\n");
            const desiredLines: string[] = [];
            for (const line of lines) {
                if (!isInternalFrame(line) && line) {
                    desiredLines.push(line);
                }
            }
            return desiredLines.join("\n");
        };

        const error = new Error("Test error");
        error.stack = "Error: Test error\n    at test (q.js:100:10)\n    at test (q.js:200:10)";
        const filteredStack = filterStackString(error.stack);
        expect(filteredStack).not.toContain("at test (q.js:100:10)");
        expect(filteredStack).not.toContain("at test (q.js:200:10)");
    });
});