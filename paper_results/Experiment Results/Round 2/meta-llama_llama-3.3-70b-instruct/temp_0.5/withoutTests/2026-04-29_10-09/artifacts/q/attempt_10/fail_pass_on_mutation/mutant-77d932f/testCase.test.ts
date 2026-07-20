describe("getFileNameAndLineNumber function", () => {
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

    function emptyGetFileNameAndLineNumber(stackLine) {
        return;
    }

    it("should return a value that is an array with two elements", () => {
        const stackLine = "at functionName (filename:10:20)";
        const result = getFileNameAndLineNumber(stackLine);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(2);
        expect(typeof result[0]).toBe('string');
        expect(typeof result[1]).toBe('number');
    });
});