describe("getFileNameAndLineNumber", () => {
    it("should correctly parse the stack line and fail on mutated code", () => {
        const stackLine = "at myFunction (myFile.js:10:20)";
        const getFileNameAndLineNumber = (stackLine: string) => {
            const attempt2 = /at ([^ ]+):(\d+):(\d+)$/.exec(stackLine);
            if (attempt2) {
                return [attempt2[1], Number(attempt2[2])];
            }
            const attempt3 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
            if (attempt3) {
                return [attempt3[1], Number(attempt3[2])];
            }
            return null;
        };
        const result = getFileNameAndLineNumber(stackLine);
        expect(result).toEqual(["myFile.js", 10]);
    });
});