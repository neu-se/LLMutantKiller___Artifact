describe("captureLine function", () => {
    it("should return a line number", () => {
        const error = new Error();
        if (error.stack) {
            const stackLines = error.stack.split("\n");
            if (stackLines.length > 2) {
                const fileNameAndLineNumber = getFileNameAndLineNumber(stackLines[2]);
                if (fileNameAndLineNumber && fileNameAndLineNumber[0] && fileNameAndLineNumber[1]) {
                    expect(fileNameAndLineNumber[0]).not.toBeNull();
                    expect(fileNameAndLineNumber[1]).toBeGreaterThan(0);
                } else {
                    throw new Error("fileNameAndLineNumber is null or undefined");
                }
            } else {
                throw new Error("Not enough stack lines");
            }
        } else {
            throw new Error("error.stack is undefined");
        }
    });
});

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