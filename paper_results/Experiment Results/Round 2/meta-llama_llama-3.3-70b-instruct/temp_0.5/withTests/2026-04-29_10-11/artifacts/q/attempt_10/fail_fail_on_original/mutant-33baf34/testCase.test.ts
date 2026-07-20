describe("getFileNameAndLineNumber", () => {
    it("should return a value when attempt1 is truthy", () => {
        const stackLine = "at functionName (filename:10:20)";
        const originalGetFileNameAndLineNumber = getFileNameAndLineNumber;
        function getFileNameAndLineNumber(stackLine: string): [string, number] | null {
            var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
            if (attempt1) {
                // do nothing
            }
            var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
            if (attempt2) {
                return [attempt2[1], Number(attempt2[2])];
            }
            var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
            if (attempt3) {
                return [attempt3[1], Number(attempt3[2])];
            }
            return null;
        };
        const resultMutated = getFileNameAndLineNumber(stackLine);
        expect(resultMutated).toBeNull();
        getFileNameAndLineNumber = originalGetFileNameAndLineNumber;
        const resultOriginal = getFileNameAndLineNumber(stackLine);
        expect(resultOriginal).not.toBeNull();
        expect(resultOriginal).toEqual(["filename", 10]);
    });
});

function getFileNameAndLineNumber(stackLine: string): [string, number] | null {
    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
    if (attempt1) {
        return [attempt1[1], Number(attempt1[2])];
    }

    // Anonymous functions: "at filename:lineNumber:columnNumber"
    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
    if (attempt2) {
        return [attempt2[1], Number(attempt2[2])];
    }

    // Firefox style: "function@filename:lineNumber"
    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) {
        return [attempt3[1], Number(attempt3[2])];
    }

    return null;
}