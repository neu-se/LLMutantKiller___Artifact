describe("Q", () => {
    it("should correctly parse stack lines", () => {
        const stackLine = "at functionName (filename:123:45)";
        const result = getFileNameAndLineNumber(stackLine);
        expect(result).not.toBeNull();
        if (result) {
            expect(result.length).toBe(2);
            expect(result[0]).toBe("filename");
            expect(result[1]).toBe(123);
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