describe("Q", () => {
    it("should correctly parse stack lines with multi-digit line numbers", () => {
        const error = new Error();
        error.stack = "at foo (bar.js:12:34)";
        const stackLines = error.stack.split("\n");
        const getFileNameAndLineNumber = function(stackLine: string) {
            var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
            if (attempt1) {
                return [attempt1[1], Number(attempt1[2])];
            }
            var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
            if (attempt2) {
                return [attempt2[1], Number(attempt2[2])];
            }
        };
        const result = getFileNameAndLineNumber(stackLines[0]);
        expect(result).toEqual(["bar.js", 12]);
    });
});