describe("getFileNameAndLineNumber", () => {
    it.skip("should correctly parse the stack line with the correct regex", () => {
        const stackLine = "at myFunction (myFile.js:10:20)";
        const getFileNameAndLineNumber = (stackLine: string) => {
            const attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
            if (attempt2) {
                return [attempt2[1], Number(attempt2[2])];
            }
            return null;
        };
        const result = getFileNameAndLineNumber(stackLine);
        expect(result).toEqual(["myFile.js", 10]);
    });

    it("should not match the stack line with the incorrect regex", () => {
        const stackLine = "at myFunction (myFile.js:10)";
        const getFileNameAndLineNumber = (stackLine: string) => {
            const attempt2 = /at ([^ ]+):(\d+):(?:\d)$/.exec(stackLine);
            if (attempt2) {
                return [attempt2[1], Number(attempt2[2])];
            }
            return null;
        };
        const result = getFileNameAndLineNumber(stackLine);
        expect(result).toBeNull();
    });
});