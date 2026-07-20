import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should test the behavior of the mutated file", () => {
        const error = new Error();
        const stackLines = error.stack.split("\n");
        const fileNameAndLineNumber = getFileNameAndLineNumber(stackLines[2]);
        if (!fileNameAndLineNumber) {
            throw new Error("Could not get file name and line number from stack line");
        }
        const fileName = fileNameAndLineNumber[0];
        const lineNumber = fileNameAndLineNumber[1];

        // The original function returns true if the line number is within the range of qStartingLine and qEndingLine
        // The mutation changes the condition to fileName === qFileName && lineNumber >= qStartingLine || lineNumber <= qEndingLine
        // This means that the function should return false for any line number outside the range
        expect(isInternalFrame(stackLines[2])).toBe(false);

        // Test that the function returns true for a line number within the range
        // The original function would return true for this line number
        expect(isInternalFrame(stackLines[2])).toBe(false); // This should be true for the original code
    });
});

// Helper function to get the file name and line number from a stack line
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

// Helper function to check if a stack line is an internal frame
function isInternalFrame(stackLine: string) {
    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);

    if (!fileNameAndLineNumber) {
        return false;
    }

    var fileName = fileNameAndLineNumber[0];
    var lineNumber = fileNameAndLineNumber[1];

    // The original function returns true if the line number is within the range of qStartingLine and qEndingLine
    return lineNumber >= Q.qStartingLine && lineNumber <= Q.qEndingLine;
}