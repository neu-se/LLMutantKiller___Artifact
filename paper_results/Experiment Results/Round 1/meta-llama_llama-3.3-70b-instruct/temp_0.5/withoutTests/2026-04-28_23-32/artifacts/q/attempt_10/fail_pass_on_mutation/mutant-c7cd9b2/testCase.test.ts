import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should correctly parse stack lines", () => {
        const getFileNameAndLineNumber = (stackLine: string) => {
            // Named functions: "at functionName (filename:lineNumber:columnNumber)"
            // In IE10 function name can have spaces ("Anonymous function") O_o
            var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
            if (attempt1) {
                return [attempt1[1], Number(attempt1[2])];
            }

            // Anonymous functions: "at filename:lineNumber:columnNumber"
            var attempt2 = /at ([^ ]+):(\d+):(?:\d)$/.exec(stackLine);
            if (attempt2) {
                return [attempt2[1], Number(attempt2[2])];
            }

            // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
            var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
            if (attempt3) {
                return [attempt3[1], Number(attempt3[2])];
            }
            return null;
        };

        const error = new Error();
        error.stack = "at functionName (/path/to/file.js:12:34)";
        const lines = error.stack.split("\n");
        const firstLine = lines[0];
        const result = getFileNameAndLineNumber(firstLine);
        expect(result).not.toBeNull();
        expect(result[0]).toBe("/path/to/file.js");
        expect(result[1]).toBe(12);
    });
});