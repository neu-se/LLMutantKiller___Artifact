describe("isInternalFrame function", () => {
    function getFileNameAndLineNumber(stackLine) {
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

    function isInternalFrame(stackLine) {
        var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);
        if (!fileNameAndLineNumber) {
            return false;
        }
        var fileName = fileNameAndLineNumber[0];
        var lineNumber = fileNameAndLineNumber[1];
        return fileName === "filename" && lineNumber >= 10 && lineNumber <= 20;
    }

    function emptyGetFileNameAndLineNumber(stackLine) {
        return;
    }

    function isInternalFrameMutated(stackLine) {
        var fileNameAndLineNumber = emptyGetFileNameAndLineNumber(stackLine);
        if (!fileNameAndLineNumber) {
            return false;
        }
        var fileName = fileNameAndLineNumber[0];
        var lineNumber = fileNameAndLineNumber[1];
        return fileName === "filename" && lineNumber >= 10 && lineNumber <= 20;
    }

    it("should return true for internal frames", () => {
        const stackLine = "at functionName (filename:10:20)";
        const originalResult = isInternalFrame(stackLine);
        const mutatedResult = isInternalFrameMutated(stackLine);
        expect(originalResult).toBe(true);
        expect(mutatedResult).toBe(false);
    });
});