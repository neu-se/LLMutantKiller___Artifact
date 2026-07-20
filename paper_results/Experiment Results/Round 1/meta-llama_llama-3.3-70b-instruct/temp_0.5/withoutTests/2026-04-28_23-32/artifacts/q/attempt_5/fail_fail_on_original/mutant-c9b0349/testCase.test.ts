import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should correctly handle isInternalFrame function", () => {
        const error = new Error();
        const promise = q.reject(error);
        const stack = promise.stack;
        if (stack) {
            const lines = stack.split("\n");
            const isInternalFrame = (line: string) => {
                const fileNameAndLineNumber = getFileNameAndLineNumber(line);
                if (!fileNameAndLineNumber) {
                    return false;
                }
                const lineNumber = fileNameAndLineNumber[1];
                return lineNumber >= getQStartingLine() && lineNumber <= getQEndingLine();
            };
            const internalFrames = lines.filter(isInternalFrame);
            expect(internalFrames.length).toBeGreaterThan(0);
        } else {
            expect(true).toBe(false);
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

function getQStartingLine() {
    try {
        throw new Error();
    } catch (e) {
        const lines = e.stack.split("\n");
        const firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
        const fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
        if (!fileNameAndLineNumber) {
            return 0;
        }
        return fileNameAndLineNumber[1];
    }
}

function getQEndingLine() {
    try {
        throw new Error();
    } catch (e) {
        const lines = e.stack.split("\n");
        const lastLine = lines[lines.length - 1];
        const fileNameAndLineNumber = getFileNameAndLineNumber(lastLine);
        if (!fileNameAndLineNumber) {
            return 0;
        }
        return fileNameAndLineNumber[1];
    }
}